const express = require('express');
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const messagesRoutes = require("./api/routes/messages");

//set up db connection to MongoDB Atlas
//hard coded db credentials, having problem with nodemon.js environment variables
mongoose.connect(
    "mongodb+srv://hluhano:" + "hluhano55" + "@rajluhmongoatlas.9uqz3.mongodb.net/" + "rajluhmongoatlas" + "?retryWrites=true&w=majority",
  {
    useNewUrlParser :true,
    useUnifiedTopology: true
  }
);
//need this to access mongoose in other files (gloabl scope)
mongoose.Promise = global.Promise;

//configuring logger and bodyparser 
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow access via browsers (fix for CORS error) 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//api route
app.use("/messages", messagesRoutes);

//invalid route and error handling
app.use((req, res, next) => {
  const error = new Error("Invalid route. Did you mean: GET messages/");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;