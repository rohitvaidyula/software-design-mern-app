const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = express.Router();
const PORT = 4000;

let User = require("./user.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Raj:Singh@software-design-db.5ytcj.mongodb.net/software-design-db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("mongodb connection ");
});

userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

userRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

userRoutes.route("/add").post(function (req, res) {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(200).json({ user: "user added" });
    })
    .catch((err) => {
      res.status(400).send("adding user failed");
    });
});

userRoutes.route("/update/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("data not found)");
    else user.user_firstname = req.body.user_firstname;
    user.user_lastname = req.body.user_lastname;
    user.user_addy1 = req.body.user_addy1;
    user.user_addy2 = req.body.user_addy2;
    user.user_city = req.body.user_city;
    user.user_zipcode = req.body.user_zipcode;
    user.user_state = req.body.user_state;

    user
      .save()
      .then((user) => {
        res.json("user updated");
      })
      .catch((err) => {
        res.status(400).send("update not possible");
      });
  });
});

app.use("/user", userRoutes);

app.listen(PORT, function () {
  console.log("server is running on Port:" + PORT);
});
