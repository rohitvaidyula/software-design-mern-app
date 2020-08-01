var express = require("express");
var router = express.Router();
var Profile = require("../models/ProfileController");
require("dotenv").config();
var auth = require("../middleware/auth");

router.post("/add-profile", auth, async (req, res) => {
  try {
    const newProfile = new Profile({
      _id: req.body.ID,
      user_firstname: req.body.first,
      user_lastname: req.body.last,
      user_addy1: req.body.addr1,
      user_addy2: req.body.addr2,
      user_city: req.body.city,
      user_zipcode: req.body.zipcode,
      user_state: req.body.state,
    });

    await newProfile.save();
    return res.send(true);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/update-profile", auth, async (req, res) => {
  try {
    await Profile.findById(req.body.ID, function (err, user) {
      if (!user) {
        return res.send(400).json({
          message: "User not found.",
        });
      } else {
        (user.user_firstname = req.body.first),
          (user.user_lastname = req.body.last),
          (user.user_addy1 = req.body.addr1),
          (user.user_addy2 = req.body.addr2),
          (user.user_city = req.body.city),
          (user.user_zipcode = req.body.zipcode),
          (user.user_state = req.body.state);

        user.save();
        return res.send(true);
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
