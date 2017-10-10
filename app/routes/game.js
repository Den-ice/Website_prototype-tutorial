// We import our game Schema
import Game from '../models/games';

// Get all the games sorted by postDate
const getGames = (req, res) => {
  //Query the db, of no erroes send all the games to the client
  Game.find(null, null, { sort: { postDate : 1 } }, (err, games) => {
    if (err) {
      res.send(err);
    }
    res.json(games); // Games sent as json
  });
}

// Get a single game filtered by ID
const getGame = (req, res) => {
  const { id } = req.params;
  //Query the db for a single game, if no erroes send it to the client
  Game.findById(id, (err, game) => {
    if (err) {
      res.send(err);
    }
    res.json(game); // Game sent as json
  });
}

// Get the body data and create a new Game
const postGame = (req, res) => {
  // We assign the game info to a empty game and send a message back if no errors
  let game = Object.assign(new Game(), req.body);
  // Then we save it into the db
  game.save(err => {
    if (err){
      res.send(err);
    }
    res.json({ message: 'game created' }); // A simple JSOn answer to inform the client
  });
};

// Delete a game by the given ID
const deleteGame = (req, res) => {
  // we remove the game by the given id and send a message back if no errors
  Game.remove(
    { _id: req.params.id },
    err => {
      if (err) {
        res.send(err);
        }
        res.json({ message: 'successgully deleted' }); // A simple JSON answer to infom the client
    }
  );
};

// We export our functions to beused in the server routes
export { getGames, getGame, postGame, deleteGame };
