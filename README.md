# myFlix API
The complete server-side of the myFlix application, including the server, business logic, and business layers of the application. It consists of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. 
The REST API is accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) are used to retrieve data from the database and store that data in a non-relational way.

## Features
* Get a list of all movies 
* Get (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
* Get data about a genre (description) by name/title (e.g., “Comedy”)
* Get data about a director (bio, birth year, death year) by name
* Allow new users to register
* Allow users to update their user info (username)
* Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
* Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
* Allow existing users to deregister (showing only a text that a user email has been removed)

## Links
* Documentation: https://myflix-2022.herokuapp.com/documentation.html
* Live Api: https://myflix-2022.herokuapp.com/
* Client-side built with React: https://myflix2022-client-react.netlify.app/
* Client-side built with Angular: https://siavash-ebrahimi.github.io/myFlix-Angular-client/

## Built with
* Node.js
* Express
* MongoDB
* Mongoose


