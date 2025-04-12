const mongoose = require("mongoose");

const User = require("./User");
const kupacSchema = new mongoose.Schema({
  ListaKupljenihProizvoda: [
    {
      ListaKupljenihProizvoda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proizvod",
      },
    },
  ],
  Role: {
    type: String,
    default: "Kupac",
  },
});
module.exports = User.discriminator("Kupac", kupacSchema);
