const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
  movie_ID: {
    type: Number,
    unique: true,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'actors',
      required: true,
    },
  ],
});

const moviesCollection = mongoose.model('movies', moviesSchema);

const Movies = {
  createMovie: function (newMovie) {
    return moviesCollection
      .create(newMovie)
      .then((createdMovie) => {
        return createdMovie;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  removeActorFromMovieList: function (movieid, actors) {
    return moviesCollection
      .findOneAndUpdate(
        { id: movieid },
        { $set: { actors: actors } },
        { new: true }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getMovieByID: function (movieid) {
    return moviesCollection
      .findOne({ id: movieid })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};

module.exports = {
  Movies,
};
