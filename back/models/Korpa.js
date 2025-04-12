const mongoose = require("mongoose");
const korpaSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  ListaProizvodaUKorpi: [
    {
      ListaProizvodaUKorpi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proizvod",
      },
    },
  ],
});
module.exports = mongoose.model("Korpa", korpaSchema);
