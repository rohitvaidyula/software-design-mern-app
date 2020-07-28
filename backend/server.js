const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 4000;
var UserRoutes = require("./routes/UserRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/", UserRoutes);

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.listen(PORT);
