const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const { Movies } = require('./models/movie-model');
const { Actors } = require('./models/actor-model');
const { DATABASE_URL, PORT } = require('./config');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.patch('/api/delete-movie-actor/:movie_ID', jsonParser, (req, res) => {
  let { id, firstName, lastName } = req.body;
  let movieid = req.params.movie_ID;

  if (!id) {
    errorHandler(1, req, res);
  }
  if (id != movieid) {
    errorHandler(2, req, res);
  }
  if (!firstName || !lastName) {
    errorHandler(3, req, res);
  }
  Actors.getActorByName(firstName, lastName)
    .then((actor) => {
      Movies.getMovieByID(movieid).then((movieres) => {
        if (!movieres || !actor) {
          errorHandler(4, req, res);
        }
        let arrayActors = movieres;
        if (arrayActors.length == 0) {
        } else {
          let value = arrayActors.findIndex((element) => {
            return element._id == movieres._id;
          });

          if (value != -1) {
            arrayActors.splice(value, 1);
          }
          Movies.removeActorFromMovieList(movieid, arrayActors)
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              errorHandler(4, req, res);
            });
        }
        res.status(200).json({ movie: movieres });
      });
    })
    .catch((err) => {
      errorHandler(5, req, res);
    });
});

app.post('/movie', jsonParser, (req, res) => {
  let { movie_ID, movie_title, year, rating, actors } = req.body;
  let newMovie = {
    movie_ID,
    movie_title,
    year,
    rating,
    actors,
  };
  Movies.createMovie(newMovie)
    .then((movie) => {
      return res.status(201).json(movie);
    })
    .catch((err) => {
      res.statusMessage =
        'Something went wrong with the database ' + err.message;
      res.status(500).end();
    });
});

app.post('/actors', jsonParser, (req, res) => {
  let { firstName, lastName, actor_ID } = req.body;
  let newActor = {
    firstName,
    lastName,
    actor_ID,
  };
  Actors.createActor(newActor)
    .then((actorRes) => {
      return res.status(201).json(actorRes);
    })
    .catch((err) => {
      res.statusMessage =
        'Something went wrong with the database ' + err.message;
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log('This server is running on port 8080');
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log('Database connected successfully.');
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});

// 5eda48573088d20cf2f62fd4 id alicia
//movie id shala = 1
