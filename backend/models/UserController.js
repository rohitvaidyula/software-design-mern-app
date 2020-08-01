const mongoose = require("mongoose");

const userCredSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
  },
  passWord: {
    type: String,
    required: true,
    minlength: 8,
  },
  user_firstname: {
    //required: true,
    type: String,
  },
  user_lastname: {
    //required: true,
    type: String,
  },
  user_addy1: {
    //required: true,
    type: String,
  },
  user_addy2: {
    //required: false,
    type: String,
  },
  user_city: {
    //required: true,
    type: String,
  },
  user_zipcode: {
    //required: true,
    type: String,
    minlength: 5,
  },
  user_state: {
    //required: true,
    type: String,
  },
});

const user = mongoose.model("user", userCredSchema);
module.exports = user;
