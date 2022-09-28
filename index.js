const express = require('express');
const morgan = require('morgan');

// // The app variable will take and wrap all "express module" functionalities inside,
// // by using "express()" and let us approach that.
const app = express();

// topTenMovies array stand as a database.
let topTenMovies =[
  {
    titel: 'Avatar',
    release: '2009-2022',
    director: 'James Cameron',
    starring: ['Sam Worthington', 'Zoe Saldana', 'Stephen Lang', 'Michelle Rodriguez', 'Sigourney Weaver'],
    poster: 'https://en.wikipedia.org/wiki/Avatar_(2009_film)#/media/File:Avatar_(2009_film)_poster.jpg'
  },
  {
    titel: 'The Lord of the Rings: The Return of the King',
    release: '2001–2003-2022(online)',
    director: 'Peter Jackson',
    starring: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen', 'Sean Astin', 'Cate Blanchett',
    'John Rhys-Davies', 'Christopher Lee', 'Billy Boyd', 'Dominic Monaghan', 'Orlando Bloom', 'Hugo Weaving',
    'Andy Serkis', 'Sean Bean'],
    poster: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings:_The_Return_of_the_King#/media/File:The_Lord_of_the_Rings_-_The_Return_of_the_King_(2003).jpg'
  },
  {
    titel: 'Titanic',
    release: '1997',
    director: 'James Cameron',
    starring: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane', 'Kathy Bates', 'Frances Fisher', 'Bernard Hill',
    'Jonathan Hyde', 'Danny Nucci', 'David Warner', 'Bill Paxton'],
    poster: 'https://en.wikipedia.org/wiki/Titanic_(1997_film)#/media/File:Titanic_(1997_film)_poster.png'
  },
  {
    titel: 'Jurassic World (Fallen Kingdom)',
    release: '2018',
    director: 'J. A. Bayona',
    starring: ['Chris Pratt', 'Bryce Dallas Howard', 'Rafe Spall', 'Toby Jones', 'Ted Levine', 'BD Wong', 'Jeff Goldblum'],
    poster: 'https://en.wikipedia.org/wiki/Jurassic_World:_Fallen_Kingdom_(film_score)#/media/File:JurassicWorldFallenKingdomOST.jpg'
  },
  {
    titel: 'Mission Impossible Fallout',
    release: '2018',
    director: 'Christopher McQuarrie',
    starring: ['Tom Cruise', 'Henry Cavill', 'Ving Rhames', 'Simon Pegg', 'Rebecca Ferguson', 'Sean Harris',
    'Angela Bassett', 'Michelle Monaghan', 'Alec Baldwin'],
    poster: 'https://en.wikipedia.org/wiki/Mission:_Impossible_%E2%80%93_Fallout#/media/File:MI_%E2%80%93_Fallout.jpg'
  },
  {
    titel: 'Top Gun (Maverick)',
    release: '2022',
    director: 'Joseph Kosinski',
    starring: ['Tom Cruise', 'Val Kilmer', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm', 'Glen Powell',
    'Ed Harris', 'Monica Barbaro', 'Lewis Pullman'],
    poster: 'https://en.wikipedia.org/wiki/Top_Gun:_Maverick#/media/File:Top_Gun_Maverick_Poster.jpg'
  },
  {
    titel: 'Iron Man 3',
    release: '2013',
    director: 'Shane Black',
    starring: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Guy Pearce', 'Rebecca Hall',
    'Stéphanie Szostak', 'James Badge Dale', 'Jon Favreau', 'Ben Kingsley'],
    poster: 'https://en.wikipedia.org/wiki/Iron_Man_3#/media/File:Iron_Man_3_poster.jpg'
  },
  {
    titel: 'Aladdin',
    release: '2019',
    director: 'Guy Ritchie',
    starring: ['Will Smith', 'Mena Massoud', 'Naomi Scott', 'Marwan Kenzari', 'Navid Negahban', 'Nasim Pedrad', 'Billy Magnussen'],
    poster: 'https://en.wikipedia.org/wiki/Aladdin_(2019_film)#/media/File:Aladdin_(Official_2019_Film_Poster).png'
  },
  {
    titel: 'Star Wars: The Force Awakens',
    release: '2015',
    director: 'J. J. Abrams',
    starring: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Adam Driver', 'Daisy Ridley', 'John Boyega',
    'Oscar Isaac', 'Lupita Nyong o', 'Andy Serkis', 'Domhnall Gleeson', 'Anthony Daniels', 'Peter Mayhew', 'Max von Sydow'],
    poster: 'https://en.wikipedia.org/wiki/Star_Wars:_The_Force_Awakens#/media/File:Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
  },
  {
    titel: 'Skyfall',
    release: '2012',
    director: 'Sam Mendes',
    starring: ['Daniel Craig', 'Javier Bardem', 'Ralph Fiennes', 'Naomie Harris', 'Bérénice Marlohe', 'Albert Finney', 'Judi Dench'],
    poster: 'https://en.wikipedia.org/wiki/Skyfall#/media/File:Skyfall_poster.jpg'
  }
];

// ================================================================
// ===================== Middleware Functions: ====================

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
