const mongoose = require("mongoose");
const { text } = require("body-parser");
const Schema = mongoose.Schema;

let quoteFormSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      //minlength : 5,
    },

    name: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    del_date: {
      type: Date,
      required: true,
    },

    gallon: {
      type: Number,
      required: true,
    },

    suggested_price: {
      type: Number,
      required: true,
    },

    final_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", quoteFormSchema);
