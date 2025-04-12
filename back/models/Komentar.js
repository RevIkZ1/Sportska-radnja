const mongoose = require("mongoose");
const komentarSchema = new mongoose.Schemaq({
  UserID: {
    type: String,
    required: true,
  },
  ProizvodID: {
    type: String,
    required: true,
  },
  KomentarKorisnika: {
    type: String,
    required: true,
  },
});
