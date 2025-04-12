const mongoose = require("mongoose");
const lokacijaSchema = new mongoose.Schema({
  Grad: {
    type: String,
    required: true,
  },
  UlicaIBroj: {
    type: String,
    required: true,
  },
  ListaProizvoda: [
    {
      ListaProizvoda: { type: mongoose.Schema.Types.ObjectId, ref: "Proizvod" },
    },
  ],
});
module.exports = mongoose.model("Lokacija", lokacijaSchema);
