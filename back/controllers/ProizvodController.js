const Proizvod = require("../models/Proizvod");
const vratiProizvodePoCeni = (req, res) => {};
const vratiProizvodePoBrendu = async (req, res) => {
  const { marka } = req.query;
  try {
    const result = await Proizvod.find({ marka: marka });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const vratiSveProizvode = async (req, res) => {
  try {
    const result = await Proizvod.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const vratiProizvodPoID = async (req, res) => {
  const _id = req.query;
  try {
    const result = await Proizvod.findById(_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const kreirajProizvod = async (req, res) => {
  const {
    kompolujenamenjen,
    slika,
    marka,
    cena,
    boja,
    glavnitip,
    pomocnitip,
    velicina,
    imeProizvoda,
  } = req.body;
  console.log(
    kompolujenamenjen,
    slika,
    marka,
    cena,
    boja,
    glavnitip,
    pomocnitip,
    velicina,
    imeProizvoda
  );
  try {
    console.log("A BRAVO");
    const result = await Proizvod.create({
      kompolujenamenjen: kompolujenamenjen,
      slika: slika,
      marka: marka,
      cena: cena,
      boja: boja,
      glavnitip: glavnitip,
      pomocnitip: pomocnitip,
      velicina: velicina,
      imeProizvoda: imeProizvoda,
    });
    console.log("nesto");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  vratiProizvodPoID,
  kreirajProizvod,
  vratiSveProizvode,
  vratiProizvodePoBrendu,
};
