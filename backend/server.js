const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/software-design-db", {
  useNewUrlParser: true,
});

mongoose.connection.once("open", function () {
  console.log("MongoDB connected successfully");
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
