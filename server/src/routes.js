/* eslint-disable max-len */
const express = require('express');
const playerModel = require('./models');
const msgModel = require('./msgModel');
const app = express();

app.post('/add_player', async (req, res) => {
  console.log('Add player request recieved with body: ', req.body);
  const player = new playerModel(req.body);
  try {
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({error: error.message});
  }
});

app.get('/players', async (req, res) => {
  console.log('Get all players request recieved.');
  try {
    const players = await playerModel.find({});
    res.json({players: players, totalPlayers: players.length});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/players/:id', async (req, res) => {
  console.log('Get player by id request recieved with Id: ', req.params.id);
  const id = req.params.id;
  try {
    const player = await playerModel.findById(id);
    if (player) res.json({player: player});
    else res.status(404).json({message: `player not found with id:${id}`});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.put('/players/:id', async (req, res) => {
  console.log('Update player request recieved with Id:', req.params.id, 'and body: ', req.body);
  try {
    const id = req.params.id;
    const options = {new: true, runValidators: true, context: 'query'};
    const playerToUpdate = await playerModel.findByIdAndUpdate(id, req.body, options);
    if (playerToUpdate) {
      res.json({player: playerToUpdate, message: 'Updated successfully'});
    } else {
      res.status(400).json({message: `player not found with id:${id}`});
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.delete('/players/:id', async (req, res) => {
  console.log('Remove player request recieved with Id: ', req.params.id);
  const id = req.params.id;
  try {
    const player = await playerModel.findByIdAndDelete(id);
    if (player) res.json({player: player, message: 'Player removed.'});
    else res.status(400).json({message: `player not found with id:${id}`});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.delete('/players', async (req, res) => {
  console.log('Remove all players request recieved.');
  try {
    const players = await playerModel.deleteMany({});
    res.json({'Total players deleted': players.deletedCount, 'message': 'All players removed.'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
app.get('/test', async (req, res) => {
  console.log('Get request recieved.');
  const id = 1;
  const message = await msgModel.findById(id);
  console.log('message from db: ', message);
  if (message) res.send(message.message);
  else res.sendStatus(200);
});

module.exports = app;
