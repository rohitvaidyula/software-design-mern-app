var express = require("express");
var router = express.Router();

var users = [
  {
    username: "user",
    password: "password",
  },
];

router.post("/login", function (req, res) {
  let result = users.find((user) => user.username == req.body.username);
  if (result) {
    if (result.password == req.body.password) {
      res.send({
        message: "Successful Login",
      });
    } else {
      res.send({
        message: "Password is wrong",
      });
    }
  } else {
    res.send({
      message: "Username/Password does not exist",
    });
  }
});

module.exports = router;
