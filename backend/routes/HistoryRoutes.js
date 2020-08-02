var express = require("express");
var router = express.Router();
var History = require("../models/QuoteHistoryModel");
var FuelQuote = require("../models/QuoteFormModel");
var auth = require("../middleware/auth");

router.post("/add-fuel-history/:id", auth, async (req, res) => {
  try {
    const ID = req.params.id;

    const newHistory = new History({
      user_id: ID,
      username: req.body.username,
      suggestedPrice: req.body.suggested_price,
      finalPrice: req.body.final_price,
      date: req.body.del_date,
    });

    const savedUser = newHistory.save();

    return res.send(newHistory);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/get-fuel-history/:id", auth, async (req, res) => {
  try {
    await History.findById({ user_id: req.params.id }, function (err, history) {
      if (!history) {
        return res.status(400).json({
          message: "This user has no history",
        });
      } else {
        return res.send(history);
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;
