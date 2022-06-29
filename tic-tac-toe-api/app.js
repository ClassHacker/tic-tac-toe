const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const Router = require('./routes')

const corsOptions = {
   origin:'*', 
   optionSuccessStatus:200,
   methods: "GET,PUT,POST,DELETE"
}

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/userdb',
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
app.use(cors(corsOptions)) 

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});