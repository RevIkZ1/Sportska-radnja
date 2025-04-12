const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { Email, Lozinka } = req.body;
  console.log(req.body);
  if (!Email || !Lozinka)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ Email: Email }).exec();
  if (!foundUser) return res.sendStatus(401);
  if (foundUser.Lozinka == Lozinka) {
    jwt.sign(
      { Email: foundUser.Email, id: foundUser._id, role: foundUser.Role },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        console.log(foundUser);
        res.cookie("token", token).json(foundUser);
      }
    );
    console.log(jwt);
  } else {
    res.sendStatus(400);
  }
};
const handleLogout = (req, res) => {
  res.cookie("token", "").json(true);
};
module.exports = { handleLogin, handleLogout };
