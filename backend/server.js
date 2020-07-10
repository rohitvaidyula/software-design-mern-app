const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
var LoginRoute = require("./routes/Login");

app.use(bodyParser.json());
app.use(cors());
app.use("/", LoginRoute);

mongoose.connect(
  "mongodb+srv://Raj:Singh@software-design-db.5ytcj.mongodb.net/software-design-db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", function () {
  console.log("MongoDB connected successfully");
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
