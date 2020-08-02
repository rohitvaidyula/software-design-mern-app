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
});

const user = mongoose.model("user", userCredSchema);
module.exports = user;
