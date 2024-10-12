/* const router = require("express").Router();
const { encrypt, decrypt } = require("cipher")("medicore");
const User = require("../models/User");

//GET function for home route
router.get("/", function (req, res) {
  res.render("home");
});

//GET function for login route
router.get("/login", function (req, res) {
  res.render("login");
});

//GET function for register route
router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.userEmail,
    password: encrypt(req.body.password),
  });

  // console.log(newUser);

  newUser.save((e) => {
    if (e) {
      console.log(e);
    } else res.redirect("login");
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.send("username or password can't be empty!");
  }

  User.findOne({ email: username }, (err, foundUser) => {
    if (err) console.log(err);
    else {
      if (foundUser) {
        if (decrypt(foundUser.password) === password) {
          res.redirect("/");
        }
      }
    }
  });
});

module.exports = () => router;
 */
