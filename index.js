const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const uuid = require('uuid');

const fs = require('fs');
const path = require('path');

// import from movie database file (topMovieIndex.js)
const topTenMovies = require('./topMovieIndex.js');
const users = require('./users.js');

// // The app variable will take and wrap all "express module" functionalities inside,
// // by using "express()" and let us approach that.
const app = express();

app.use(bodyParser.json());

// let users = [
//   {
//     id: 1,
//     name: 'Siavash',
//     email: 'eb.sh@gil.com',
//     favoritMovies: []
//   },
//   {
//     id: 2,
//     name: 'Kim',
//     email: 'kim.siavash@gmail.com',
//     favoritMovies: ['The Avatar']
//   }
// ];

// ================================================================
// ===================== Middleware Functions: ====================

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// collect any request detailes from user and save them into log.txt
// that connected to accessLogStream variable for fs.createWriteStream !!!
app.use(morgan('combined', {stream: accessLogStream}));

// use morgan to make log of requests in terminal.
app.use(morgan('common'));

// Asked exprees to get all static requestes like /appStaticFiles/xXx.html &&
// response with exact request endpoint name inside the folder staticFiles.
app.use(express.static('public'));

// Creat a Middleware function to response an Error message to user:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ================================================================
// ================================================================

app.get('/', (req, res) => {
  res.send('<h1>Welcom to myFlix Application</h1><p>Are you eager to raise your knowledge in the movie industry? <br> We are serving whatever you want to know about Movies you like. Lets enjoy it ...</p>');
});

// ================ Main CRUD Request Response ==========================

// CREATE
// Add new app users.
app.post('/users/register', (req, res) => {
  let newUser = req.body;

  if (newUser.username) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
  else {
    const message = ('Missing name in request body');
    res.status(400).send(message);
  }
});

// CREATE
// User Post a Favorit Movie to the favorits list:
app.post('/users/:id/:movieTitel', (req, res) => {
  const { id, movieTitel } = req.params;

  let user = users.find(user => user.id == id);

  if(user){
    user.favoritMovies.push(movieTitel);
    res.status(201).send(`${movieTitel} movie has been addet to ${user.name} (id no.: ${id}) favorites movies list.`);
  }else {
    res.status(400).send('Missing titel in request body');
  }
});

// ==========================================================================================

// UPDATE
// Update the "user name" of by a user id.
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if(user) {
    user.name = updatedUser.name;
    res.status(201).json(user);
  } else {
    res.status(400).send('User with the name was not found.');
  }
});

// ==========================================================================================

//READ
// GET all movies jsno.
app.get('/movies', (req, res) => {
  res.status(200).json(topTenMovies);
});

//READ
//Gets the data about a single movie, by titel.
app.get('/movies/:titel?', (req, res) => {
  const { titel } = req.params;
  const aMovie = topTenMovies.find(aMovie => aMovie.titel === titel);

  if(aMovie) {
    res.status(200).json(aMovie);
  }else {
    res.status(404).send('Wrong Movie Titel');
  }
  // res.status(200).json(topTenMovies.find((movie) =>
  //   { return movie.titel === req.params.titel }));
});

//READ
//Gets the data about a genre.
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = topTenMovies.find(aMovie => aMovie.genre.name === genreName).genre;

  if(genre) {
    res.status(200).json(genre);
  }else {
    res.status(404).send('Wrong Movie Genre');
  }
});

//READ
//Get data about a movie(s) by a genre.
app.get('/movies/genre/:genreNameL/mL', (req, res) => {
  const { genreNameL } = req.params;
  const genre = topTenMovies.find(aMovie => aMovie.genre.name === genreNameL);

  if(genre) {
    let genreBox = [];

    topTenMovies.forEach((item) => {
      if (item.genre.name === genreNameL){
        genreBox.push(item);
      }
    });
    res.status(200).json(genreBox);

  } else {
    res.status(404).send('Wrong Movie Genre List');
  }
});

//READ
//Gets the data about a director.
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = topTenMovies.find(aMovie => aMovie.director.name === directorName).director;

  if(director) {
    res.status(200).json(director);
  }else {
    res.status(404).send('Wrong Movie Director Name.');
  }
});

//READ
//Gets all users data.
app.get('/users', (req, res) => {
  res.json(users);
});

// ==========================================================================================

//DELETE
// User Deletes a movie from Favorit list by movie titel.
app.delete('/users/:id/:movieTitel', (req, res) => {
  const { id, movieTitel } = req.params;

  let user = users.find(user => user.id == id);

  if(user) {
    user.favoritMovies = user.favoritMovies.filter(titel => titel !== movieTitel );
    res.status(201).send(`${movieTitel} movie has been removed from ${user.name} (id no.: ${id}) favorites movies list.`);
  }else {
    res.status(400).send('Missing user name or movie titel name');
  }
});

//DELETE
// Remove a user from useres repository.
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if(user) {
    users = users.filter(user => user.id != id );
    res.status(201).send(`The user ${user.name} with id no.: ${id} has been removed.`);
  }else {
    res.status(400).send('No Such a User');
  }
});

// listen for requests
app.listen(8080, () =>{
  console.log('The app server is listening on port 8080.');
});
