const Lokacija = require("../models/Lokacija");
const mongoose = require("mongoose");

const createLokacija = async (req, res) => {
  const { Grad, UlicaIBroj } = req.body;
  try {
    const result = await Lokacija.create({
      Grad: Grad,
      UlicaIBroj: UlicaIBroj,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const returnLokacije = async (req, res) => {
  try {
    const result = await Lokacija.find();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const vratiLokacijuPoId = async (req, res) => {
  const _id = req.query;
  try {
    console.log(_id);

    const { Grad, UlicaIBroj, ListaProizvoda } = await Lokacija.findById(_id);
    console.log(Grad, UlicaIBroj, ListaProizvoda);
    res.status(200).json({ Grad, UlicaIBroj, ListaProizvoda });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { createLokacija, returnLokacije, vratiLokacijuPoId };
