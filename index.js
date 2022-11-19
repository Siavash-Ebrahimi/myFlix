const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const uuid = require('uuid');

const fs = require('fs');
const path = require('path');

/* Import Express-Validation, to validate and check all entries through the
   Client Side requests at Server side. */
const { check, validationResult } = require('express-validator');
// Creat an Arry of all validation reqyest we need for a user:
const userValidation = [
  check('Username', 'Username must be at least 5 characters.').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password must be at least 5 characters.').isLength({ min: 8 }),
  check('Email', 'Email is not valid').isEmail(),
  check('Birthday', 'Birthday is not valid').isDate()
];

// -----------------------------------------------------------------------------

/* Import Mongoose module, to get access to your MongoDB database. */
const mongoose = require('mongoose');

// import from Models.js file that connected to Mongoose database.
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//==============================================================================
//========= Conecting API to Databases | Local & Online (Cloud) ================
//==============================================================================

/* Below command connect our API (index.js) to MongoDB database for
       making requer and respose. */
// mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

/* Below command connect our API (index.js) to MongoDB Atlas the cloud database for
       making requer and respose by using enviorment variabels on Paas cloud Herku. */
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// =============================================================================


/* The app variable will take and wrap all "express module" functionalities inside,
   by using "express()" and let us approach that. */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//==============================================================================
//========= API CROS policy && Authentication & Security Part ==================
//==============================================================================

// CROS Policy:
/* Import CROS (Cross-Origin Resource Sharing) module policy and aske Express to use it
   to defined what kind of domains are able to send request to our API (myFlix API)  */
const cors = require('cors');
// With this line of codes all domains are allowed to make requests to API.
// app.use(cors());

/* We ask Application to check the Domains name variable list "allowedOrigins" to
   check CROS policy and if they are able to send request to our API or not */
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Authentication and Authorization :
/* Import auth.js file that hold Basic HTTP Authentication and JWT Authentication
   for login request and provide JWT Token for each API request. */
let auth = require('./auth.js')(app);

/* Import passport.js file that defines what kind of Authentication and Authorization
   we want to use in our application. (Basic HTTP & JWT) */
const passport = require('passport');
require('./passport');

// =============================================================================
// ========================== Middleware Functions: ============================
// =============================================================================

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

// collect any request detailes from user and save them into log.txt
// that connected to accessLogStream variable for fs.createWriteStream !!!
app.use(morgan('combined', { stream: accessLogStream }));

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

// =============================================================================
// =============================================================================

// Welcome Message.
app.get('/', (req, res) => {
  res.send('<h1>Welcom to myFlix Application</h1><p>Are you eager to raise your knowledge in the movie industry? <br> We are serving whatever you want to know about Movies you like. Lets enjoy it ...</p>');
});

// =============================================================================
// =================== Main CRUD Request Response ==============================
// =============================================================================

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
/* The "userValidation" variable is an array that is defined at the beginning,
   and contains all checkpoints (check) for validating an entry. */
app.post('/users/register', userValidation, (req, res) => {

  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
        //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// CREATE
// Add a movie to a user's list of favorites
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request 
    passport.authenticate('jwt', { session: false }), */
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
app.get('/movies/:Title?', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { Title } = req.params;
  Movies.findOne({ Title: Title })
    .then((movie) => {
      if (movie) {
        return res.status(201).json(movie);
      } else {
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
app.get('/movies/genre/:GenreName?', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { GenreName } = req.params;
  Movies.findOne({ 'Genre.Name': GenreName })
    .then((movie) => {
      if (movie) {
        return res.status(200).json(movie.Genre);
      } else {
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
app.get('/movies/directors/:DirectorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { DirectorName } = req.params;
  Movies.findOne({ 'Director.Name': DirectorName })
    .then((movie) => {
      if (movie) {
        return res.status(201).json(movie.Director);
      } else {
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { Username } = req.params;
  Users.findOne({ Username: Username })
    .then((user) => {
      if (user) {
        return res.status(201).json(user);
      } else {
        return res.status(404).send('There is no Username: ' + Username + ' in our database!')
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
// ==========================================================================================

// User input Validation Array:

// UPDATE
// Update the Users information by input UserName.
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
/* Also the "userValidation" variable is an array that is defined at the beginning,
   and contains all checkpoints (check) for validating an entry. */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), userValidation, (req, res) => {
  // check the validation object for errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // const {UserName} = req.params;
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      },
    },
    // This line makes sure that the updated document is returned
    { new: true },
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

//DELETE
// Delete a user by username
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
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
/* This Line of code "passport.authenticate('jwt', { session: false })" make sure
    that the user has already Authenticated and Authorized to use this request  */
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
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
// app.listen(8080, () =>{
//   console.log('The app server is listening on port 8080.');
// });
