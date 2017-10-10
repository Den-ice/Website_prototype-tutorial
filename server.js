import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

//import models and routes
import Game from './app/models/games';
import { getGames, getGame, postGame, deleteGame } from './app/routes/game';

const app = express(); //express server!
const port = process.env.PORT || 8080;

//DB connection through mongoose
const options = {
  server: {socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}},
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000}}
};//options for the db connection
mongoose.connect('localhost:27017', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//telling express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

//Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routes
app.route('/games')
// create a game
.post(postGame)
//get all ze games
.get(getGames);
app.route('/games/:id')
// get asingle game
.get(getGame)
// delete a single game
.delete(deleteGame);

//All other requests send back to Homepage
app.route("*").get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname});
});

app.listen(port);

console.log('listenng on port ${port}');
