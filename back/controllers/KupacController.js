const Kupac = require("../models/Kupac");
const createKupac = async (req, res) => {
  const { Pol, Ime, Prezime, BrojTelefona, Email, Lozinka } = req.body;
  console.log(Pol, Ime, Prezime, BrojTelefona, Email, Lozinka);
  const Email2 = await Kupac.findOne({ Email: Email });
  console.log(Email2);
  if (Email2) {
    return res
      .status(409)
      .json({ message: "Kupac sa ovim emailom već postoji." });
  }
  try {
    console.log(Pol, Ime, Prezime, BrojTelefona, Email, Lozinka);
    if (Pol == "Musko" || Pol == "Zensko") {
      const result = await Kupac.create({
        Ime: Ime,
        Prezime: Prezime,
        BrojTelefona: BrojTelefona,
        Email: Email,
        Lozinka: Lozinka,
        Pol: Pol,
      });
      const rezultat = await result.save();
      res.status(201).json({ success: "Kreiran je" });
    } else {
      res.status(500).json({ success: "To nema" });
    }
  } catch {
    res.status(500).json(error);
  }
};
module.exports = {
  createKupac,
};
