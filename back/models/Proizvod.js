const mongoose = require("mongoose");
const proizvodSchema = new mongoose.Schema({
  imeProizvoda: {
    type: String,
    required: true,
  },
  kompolujenamenjen: {
    type: String,
    required: true,
  },
  slika: {
    type: String,
    required: true,
  },
  marka: {
    type: String,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  boja: {
    type: String,
    required: true,
  },
  glavnitip: {
    type: String,
    required: true,
  },
  pomocnitip: {
    type: String,
    required: true,
  },
  velicina: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Proizvod", proizvodSchema);
