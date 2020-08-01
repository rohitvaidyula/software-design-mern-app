const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  user_firstname: {
    type: String,
  },
  user_lastname: {
    type: String,
  },
  user_addy1: {
    type: String,
  },
  user_addy2: {
    type: String,
  },
  user_city: {
    type: String,
  },
  user_zipcode: {
    type: String,
  },
  user_state: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);
