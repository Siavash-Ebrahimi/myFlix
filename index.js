const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const uuid = require('uuid');

const fs = require('fs');
const path = require('path');

// // import from movie database file (topMovieIndex.js)
// const topTenMovies = require('./topMovieIndex.js');
// const users = require('./users.js');

const mongoose = require('mongoose');
// import from Models.js file that connected to Mongoose database.
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


// Below command connect our server (index.js) to MongoDB database for
// making requer and respose.
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // The app variable will take and wrap all "express module" functionalities inside,
// // by using "express()" and let us approach that.
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth.js')(app);

const passport = require('passport');
require('./passport');
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

// Welcome Message.
app.get('/', (req, res) => {
  res.send('<h1>Welcom to myFlix Application</h1><p>Are you eager to raise your knowledge in the movie industry? <br> We are serving whatever you want to know about Movies you like. Lets enjoy it ...</p>');
});

// ================ Main CRUD Request Response ==============================
// ==========================================================================

// CREATE
// Add new app users.
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users/register', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists !!');
      } else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// CREATE
// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// ==========================================================================================

//READ
// GET all movies jsno.
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movie) => {
    return res.status(200).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//READ
//Gets the data about a single movie, by Title.
app.get('/movies/:Title?', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {Title} = req.params;
  Movies.findOne({Title: Title})
    .then((movie) => {
      if (movie) {
        return res.status(201).json(movie);
      }else {
        return res.status(404).send('There is no Movie: ' + Title + ' in our database!')
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ
//Gets the data about a Genre.
app.get('/movies/genre/:GenreName?', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { GenreName } = req.params;
  Movies.findOne({ 'Genre.Name': GenreName})
    .then((movie) => {
      if (movie) {
        return res.status(201).json(movie.Genre);
      }else {
        return res.status(404).send('There is no Movie: ' + GenreName + ' in our database!')
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//READ
//Gets data about a director.
app.get('/movies/directors/:DirectorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { DirectorName } = req.params;
  Movies.findOne({ 'Director.Name': DirectorName})
    .then((movie) => {
      if (movie) {
        return res.status(201).json(movie.Director);
      }else {
        return res.status(404).send('There is no Movie: ' + DirectorName + ' in our database!')
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ
//Gets all users data.
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ
// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {Username} = req.params;
  Users.findOne({ Username: Username })
    .then((user) => {
      if (user) {
        return res.status(201).json(user);
      }else {
        return res.status(404).send('There is no Username: ' + Username + ' in our database!')
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// ==========================================================================================

// UPDATE
// Update the "user name" of by a user id.
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  // const {UserName} = req.params;
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
    $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    },
  },
  // This line makes sure that the updated document is returned
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// ==========================================================================================

//DELETE
// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was removed.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//DELETE
// Delete a movie from user Favorit Movies list by username & Movie id.
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// listen for requests
app.listen(8080, () =>{
  console.log('The app server is listening on port 8080.');
});
