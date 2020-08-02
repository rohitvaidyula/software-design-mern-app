const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
var FormRoutes = require("./routes/FormRoutes");
var UserRoutes = require("./routes/UserRoutes");
var ProfileRoutes = require("./routes/ProfileRoutes");
var HistoryRoutes = require("./routes/HistoryRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/", UserRoutes);
app.use("/", ProfileRoutes);
app.use("/", FormRoutes);
app.use("/", HistoryRoutes);
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
