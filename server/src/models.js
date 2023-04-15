const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: 'Player name can\'t be null or empty.',
  },
  gamesWon: {
    type: Number,
    min: 0,
    required: true,
  },
  // gamesPlayed : {
  //     type: Number,
  //     min: 0,
  //     required: true,
  //     validate: {
  //         validator: (value) => {
  //             return value >= this.gamesWon;
  //         },
  //         message: (props) => `gamesPlayed can't be less than gamesWon, invalid value: ${props.value}`
  //     }
  // },
});

// PlayerSchema.path('gamesWon').validate((value)=>{
//     return value >= this.gamesPlayed;
// })

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
