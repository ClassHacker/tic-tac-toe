const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require('./routes');

const app = express();

app.use(cors());

app.use(express.json())
mongoose.connect('mongodb+srv://classhacker:<password>@tchat.c3lxk1k.mongodb.net/mchat',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(8081, () => {
  console.log("Server is running at port 8081");
});