const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("./config/dbConn");
const app = express();
const lokacijaKontroler = require("./controllers/LokacijaController");
const proizvodKontroler = require("./controllers/ProizvodController");
const kupacController = require("./controllers/KupacController");
const userController = require("./controllers/UserController");
const authController = require("./controllers/AuthController");
connectDB();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//User
app.get("/userProfileInfo", userController.handleUserInfo);
app.post("/login", authController.handleLogin);
app.post("/logout", authController.handleLogout);

//Kupac
app.post("/createKupac", kupacController.createKupac);

//Lokacija
app.post("/createLokacija", lokacijaKontroler.createLokacija);
app.get("/returnLokacije", lokacijaKontroler.returnLokacije);
app.get("/vratiLokacijuPoId", lokacijaKontroler.vratiLokacijuPoId);

//Proizvod
app.post("/kreirajProizvod", proizvodKontroler.kreirajProizvod);
app.get("/vratiSveProizvode", proizvodKontroler.vratiSveProizvode);
app.get("/vratiProizvodePoBrendu", proizvodKontroler.vratiProizvodePoBrendu);
app.get("/vratiProizvodePoID", proizvodKontroler.vratiProizvodPoID);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
