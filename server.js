const express = require('express');
const bodyParser = require('body-parser');
const { Movie } = require('./Movie');
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({message: 'Server on C;'});
});

app.post('/movie', (req, res) => {
  const movie = req.body;
  Movie.create(movie, (err, newMovie) => {
    err
    ? res.status(409).send(err)
    : res.status(201).send(newMovie);
  });
});

app.get('/movies', (req, res) => {
  Movie.find({isActive: true}).exec()
  .then( (movies) => res.status(200).send(movies))
  .catch( (error) => res.status(409).send(error))
});

app.get('/movie/:id', (req, res) => {
  const { id } = req.params
  Movie.findById(id).exec()
  .then( (movie) => {
    movie 
    ? res.status(200).send(movie)
    : res.status(404).send({message: "Movie not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.get('/search', (req, res) => {
  const { title } = req.query;
  Movie.findOne({title}).exec()
  .then( (movie) => {
    movie 
    ? res.status(200).send(movie)
    : res.status(404).send({message: "Movie not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.patch('/movie/:id', (req, res) => {
  const { id } = req.params
  const data = req.body
  Movie.findByIdAndUpdate(id, {$set: data}, {new: true}).exec()
  .then( (movie) => {
    movie 
    ? res.status(200).send(movie)
    : res.status(404).send({message: "Movie not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.delete('/movie/:id', (req, res) => {
  const { id } = req.params
  Movie.findByIdAndUpdate(id, {$set: {isActive: false}}, {new: true}).exec()
  .then( (movie) => {
    movie 
    ? res.status(200).send(movie)
    : res.status(404).send({message: "Movie not found"})
  })
  .catch( (error) => res.status(409).send(error))
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});