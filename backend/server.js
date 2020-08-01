const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
var UserRoutes = require("./routes/UserRoutes");
var ProfileRoutes = require("./routes/ProfileRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/", UserRoutes);
app.use("/", ProfileRoutes);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function () {
    console.log("MongoDB connected successfully");
  }
);
app.listen(PORT, function () {
  `App listening on ${PORT}`;
});
