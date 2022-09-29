const express = require('express');
const morgan = require('morgan');

const fs = require('fs');
const path = require('path');

// import from movie database file (topMovieIndex.js)
const topTenMovies = require('./topMovieIndex.js');

// // The app variable will take and wrap all "express module" functionalities inside,
// // by using "express()" and let us approach that.
const app = express();

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

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.get('/', (req, res) => {
  res.send('<h1>Welcom to myFlix Application</h1><p>Are you eager to raise your knowledge in the movie industry? <br> We are serving whatever you want to know about Movies you like. Lets enjoy it ...</p>');
});

// listen for requests
app.listen(8080, () =>{
  console.log('The app server is listening on port 8080.');
});
