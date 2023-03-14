const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//schema

const movies = [
  {
    id: 1,
    title:'Inception',
    rating: 8.8,
    synopsis: 'Dom Cobb (Leonardo DiCaprio) is a skilled thief who enters people\'s dreams to steal their secrets...',
    banner: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm2479896576/',
    link: 'https://www.netflix.com/title/70131314'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    rating: 9.0,
    synopsis: 'Batman (Christian Bale) must confront the chaotic Joker (Heath Ledger) who is causing mayhem in Gotham City...',
    banner: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm2092994304/',
    link: 'https://www.amazon.com/Dark-Knight-Christian-Bale/dp/B001L8QH2U'
  }
]

app.use(bodyParser.json());

//getallmovies

app.get('/movies', (req, res) => {
  res.json(movies);
});
//get movie by id  

app.get('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

//add new movie

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

//delete

app.delete('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  const index = movies.findIndex(movie => movie.title === movieTitle);
  if (index !== -1) {
    movies.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

//update

app.put('/movies/:title', (req, res) => {
  const movieTitle = req.params.title;
  const index = movies.findIndex(movie => movie.title === movieTitle);
  if (index !== -1) {
    const updatedMovie = req.body;
    movies[index] = updatedMovie;
    res.status(200).json(updatedMovie);
  } else {
    res.sendStatus(404);
  }
});

//you will create a server and connect to mongodb if you want.
//you may test them using postman before embedding with the frontend