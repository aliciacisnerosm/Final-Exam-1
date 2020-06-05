const mongoose = require('mongoose');

const actorsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  actor_ID: {
    type: Number,
    unique: true,
    required: true,
  },
});

const actorsCollection = mongoose.model('actors', actorsSchema);

const Actors = {
  createActor: function (newActor) {
    return actorsCollection
      .create(newActor)
      .then((createdActor) => {
        return createdActor;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  getActorByName: function (firstName, lastName) {
    return actorsCollection
      .findOne({ firstName: firstName, lastName: lastName })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};

module.exports = {
  Actors,
};
