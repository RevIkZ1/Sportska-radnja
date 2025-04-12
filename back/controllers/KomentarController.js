const Komentar = require("../models/Komentar");
const mongoose = require("mongoose");
const createKomentar = async (req, res) => {
  const { UserID, ProizvodID, KomentarKorisnika } = req.body;
  try {
    const result = Komentar.create({
      UserID: UserID,
      ProizvodID: ProizvodID,
      KomentarKorisnika: KomentarKorisnika,
    });
    res.status(200).json(result);
  } catch {
    res.status(500).json(error);
  }
};
module.exports = { createKomentar };
