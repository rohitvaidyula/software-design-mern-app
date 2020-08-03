var express = require("express");
var router = express.Router();
var Fuel = require("../models/QuoteFormModel");
require("dotenv").config();
var auth = require("../middleware/auth");

router.post("/create-form", auth, async (req, res) => {
  try {
    const newForm = await new Fuel({
      username: req.body.username,
      name: req.body.name,
      state: req.body.state,
      del_date: req.body.del_date,
      gallon: req.body.gallon,
      suggested_price: req.body.suggested_price,
      final_price: req.body.final_price,
    });

    const newFormCheck = await newForm.save();
    return res.status(200).json(newFormCheck);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/get-form/:username", auth, async (req, res) => {
  const name = req.params.username;
  await Fuel.findOne({ username: name })
    .then((form) => res.json(form))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*
router.get("/get-form-history/:id", auth, async (req, res) => {
  const ID = req.params.id;

  await Fuel.find({ user_id: ID }, function (err, fuel) {
    if (!fuel) {
      return res.status(400).json({
        message: "Form not found",
      });
    } else {
      let fuelQuoteHistory = {};
    }
  });
});
*/
module.exports = router;
