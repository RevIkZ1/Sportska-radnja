const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Ime: {
    type: String,
    required: true,
  },
  Prezime: {
    type: String,
    required: true,
  },
  BrojTelefona: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Lozinka: {
    type: String,
    required: true,
  },
  Pol: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    default: "User",
  },
});
module.exports = mongoose.model("user", userSchema);
