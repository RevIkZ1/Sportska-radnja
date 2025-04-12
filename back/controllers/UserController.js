const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleUserInfo = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) {
        console.log(err);
      }
      const { Pol, Ime, Prezime, BrojTelefona, Email, Lozinka, Role, __t } =
        await User.findById(userInfo.id);
      res.json({
        Pol,
        Ime,
        Prezime,
        BrojTelefona,
        Email,
        Lozinka,
        Role,
        __t,
      });
    });
  } else {
    res.json(null);
  }
};
module.exports = {
  handleUserInfo,
};
