function errorHandler(errorid, req, res) {
  switch (errorid) {
    case 1:
      res.statusMessage = 'Id is missing in the body of the request';
      return res.status(403).end();
      break;
    case 2:
      res.statusMessage = 'id and movie_ID do not match';
      return res.status(409).end();
      break;
    case 3:
      res.statusMessage =
        'You need to send both firstName and lastName of the actor to remove from the movie list';
      return res.status(403).end();
      break;
    case 4:
      res.statusMessage = 'actor or movie do not exists';
      return res.status(404).end();
      break;
    case 5:
      res.statusMessage = 'Something went wrong with the db';
      res.status(500).end();
      break;
  }
}

module.exports = errorHandler;
