// A list of movies:
let topTenMovies =[
  {
    titel: 'Avatar',
    release: 2009,
    genre: {
      name: 'Fantasy',
      discription: 'A famouse genre'
    },
    director: {
      name: 'James Cameron',
      bio: 'James Francis Cameron CC is a Canadian filmmaker and environmentalist. Best known for making science fiction and epic films, he first gained recognition for directing The Terminator. He found further success with Aliens, The Abyss, Terminator 2: Judgment Day, and the action comedy True Lies.',
      birth: 1954,
      death: ''
    },
    starring: ['Sam Worthington', 'Zoe Saldana', 'Stephen Lang', 'Michelle Rodriguez', 'Sigourney Weaver'],
    poster: 'https://en.wikipedia.org/wiki/Avatar_(2009_film)#/media/File:Avatar_(2009_film)_poster.jpg'
  },
  {
    titel: 'The Lord of the Rings: The Return of the King',
    release: 2003,
    genre: {
      name: 'Action',
      discription: 'A famouse genre'
    },
    director: {
      name: 'Peter Jackson',
      bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien.',
      birth: 1961,
      death: ''
    },
    starring: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen', 'Sean Astin', 'Cate Blanchett',
    'John Rhys-Davies', 'Christopher Lee', 'Billy Boyd', 'Dominic Monaghan', 'Orlando Bloom', 'Hugo Weaving',
    'Andy Serkis', 'Sean Bean'],
    poster: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings:_The_Return_of_the_King#/media/File:The_Lord_of_the_Rings_-_The_Return_of_the_King_(2003).jpg'
  },
  {
    titel: 'Titanic',
    release: 1997,
    genre: {
      name: 'Historical drama',
      discription: 'A famouse genre'
    },
    director: {
      name: 'James Cameron',
      bio: 'James Francis Cameron CC is a Canadian filmmaker and environmentalist. Best known for making science fiction and epic films, he first gained recognition for directing The Terminator. He found further success with Aliens, The Abyss, Terminator 2: Judgment Day, and the action comedy True Lies.',
      birth: 1954,
      death: ''
    },
    starring: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane', 'Kathy Bates', 'Frances Fisher', 'Bernard Hill',
    'Jonathan Hyde', 'Danny Nucci', 'David Warner', 'Bill Paxton'],
    poster: 'https://en.wikipedia.org/wiki/Titanic_(1997_film)#/media/File:Titanic_(1997_film)_poster.png'
  },
  {
    titel: 'Jurassic World (Fallen Kingdom)',
    release: 2018,
    genre: {
      name: 'Science fiction',
      discription: 'A famouse genre'
    },
    director: {
      name: 'James Cameron',
      bio: 'Juan Antonio García Bayona is a Spanish film director. He directed the 2007 horror film The Orphanage, the 2012 drama film The Impossible, and the 2016 fantasy drama film A Monster Calls.',
      birth: 1975,
      death: ''
    },
    starring: ['Chris Pratt', 'Bryce Dallas Howard', 'Rafe Spall', 'Toby Jones', 'Ted Levine', 'BD Wong', 'Jeff Goldblum'],
    poster: 'https://en.wikipedia.org/wiki/Jurassic_World:_Fallen_Kingdom_(film_score)#/media/File:JurassicWorldFallenKingdomOST.jpg'
  },
  {
    titel: 'Mission Impossible Fallout',
    release: 2018,
    genre: {
      name: 'Thriller',
      discription: 'A famouse genre'
    },
    director: {
      name: 'Christopher McQuarrie',
      bio: 'Christopher McQuarrie is an American filmmaker. He received the BAFTA Award, Independent Spirit Award, and Academy Award for Best Original Screenplay for the neo-noir mystery film The Usual Suspects. He made his directorial debut with the crime thriller film The Way of the Gun.',
      birth: 1968,
      death: ''
    },
    starring: ['Tom Cruise', 'Henry Cavill', 'Ving Rhames', 'Simon Pegg', 'Rebecca Ferguson', 'Sean Harris',
    'Angela Bassett', 'Michelle Monaghan', 'Alec Baldwin'],
    poster: 'https://en.wikipedia.org/wiki/Mission:_Impossible_%E2%80%93_Fallout#/media/File:MI_%E2%80%93_Fallout.jpg'
  },
  {
    titel: 'Top Gun (Maverick)',
    release: 2022,
    genre: {
      name: 'Action',
      discription: 'A famouse genre'
    },
    director: {
      name: 'Joseph Kosinski',
      bio: 'Joseph Kosinski is an American film director best known for his computer graphics and computer-generated imagery work, and for his work in action films. He made his big-screen directorial debut with the 2010 science fiction film Tron: Legacy, the sequel to the 1982 film Tron.',
      birth: 1974,
      death: ''
    },
    starring: ['Tom Cruise', 'Val Kilmer', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm', 'Glen Powell',
    'Ed Harris', 'Monica Barbaro', 'Lewis Pullman'],
    poster: 'https://en.wikipedia.org/wiki/Top_Gun:_Maverick#/media/File:Top_Gun_Maverick_Poster.jpg'
  },
  {
    titel: 'Iron Man 3',
    release: 2013,
    genre: {
      name: 'Superhero',
      discription: 'A famouse genre'
    },
    director: {
      name: 'Shane Black',
      bio: 'Shane Black is an American filmmaker and actor who has written such films as Lethal Weapon, The Monster Squad, The Last Boy Scout, Last Action Hero, and The Long Kiss Goodnight. As an actor, Black is best known for his role as Rick Hawkins in Predator.',
      birth: 1961,
      death: ''
    },
    starring: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Guy Pearce', 'Rebecca Hall',
    'Stéphanie Szostak', 'James Badge Dale', 'Jon Favreau', 'Ben Kingsley'],
    poster: 'https://en.wikipedia.org/wiki/Iron_Man_3#/media/File:Iron_Man_3_poster.jpg'
  },
  {
    titel: 'Aladdin',
    release: 2019,
    genre: {
      name: 'Romance',
      discription: 'A famouse genre'
    },
    director: {
      name: 'Guy Ritchie',
      bio: 'Guy Stuart Ritchie is an English film director, producer, screenwriter and businessman. His work includes British gangster films, and the Sherlock Holmes films starring Robert Downey Jr. Ritchie left school at age 15 and worked entry-level jobs in the film industry before going on to direct television commercials.',
      birth: 1968,
      death: ''
    },
    director: 'Guy Ritchie',
    starring: ['Will Smith', 'Mena Massoud', 'Naomi Scott', 'Marwan Kenzari', 'Navid Negahban', 'Nasim Pedrad', 'Billy Magnussen'],
    poster: 'https://en.wikipedia.org/wiki/Aladdin_(2019_film)#/media/File:Aladdin_(Official_2019_Film_Poster).png'
  },
  {
    titel: 'Star Wars: The Force Awakens',
    release: 2015,
    genre: {
      name: 'Space opera',
      discription: 'A famouse genre'
    },
    director: {
      name: 'J. J. Abramse',
      bio: 'Jeffrey Jacob Abrams is an American filmmaker and composer. He is best known for his works in the genres of action, drama, and science fiction. Abrams wrote and produced such films as Regarding Henry, Forever Young, Armageddon, Cloverfield, Star Trek, Star Wars: The Force Awakens, and Star Wars: The Rise of Skywalker.',
      birth: 1966,
      death: ''
    },
    starring: ['Harrison Ford', 'Mark Hamill', 'Carrie Fisher', 'Adam Driver', 'Daisy Ridley', 'John Boyega',
    'Oscar Isaac', 'Lupita Nyong o', 'Andy Serkis', 'Domhnall Gleeson', 'Anthony Daniels', 'Peter Mayhew', 'Max von Sydow'],
    poster: 'https://en.wikipedia.org/wiki/Star_Wars:_The_Force_Awakens#/media/File:Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
  },
  {
    titel: 'Skyfall',
    release: 2012,
    genre: {
      name: 'Thriller',
      discription: 'A famouse genre'
    },     
    director: {
      name: 'Sam Mendes',
      bio: 'Sir Samuel Alexander Mendes CBE is a British film and stage director, producer, and screenwriter. In 2000, Mendes was appointed a CBE for his services to drama, and he was knighted in the 2020 New Years Honours List.',
      birth: 1965,
      death: ''
    },
    starring: ['Daniel Craig', 'Javier Bardem', 'Ralph Fiennes', 'Naomie Harris', 'Bérénice Marlohe', 'Albert Finney', 'Judi Dench'],
    poster: 'https://en.wikipedia.org/wiki/Skyfall#/media/File:Skyfall_poster.jpg'
  }
];

module.exports = topTenMovies;
