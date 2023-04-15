const mongoose = require('mongoose');

const msgModel = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
  },
  message: {
    type: String,
  },
});


const Message = mongoose.model('msg', msgModel);

module.exports = Message;
