import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const UserRegister = () => {
  const [Email, SetEmail] = useState();
  const [Ime, SetIme] = useState();
  const [Prezime, SetPrezime] = useState();
  const [BrojTelefona, SetBrojTelefona] = useState();
  const [Lozinka, SetLozinka] = useState();
  const [Pol, SetPol] = useState();
  const { email, ready, setEmail1 } = useContext(UserContext);
  const navigate = useNavigate();
  const [rehydrate, setRehydrate] = useState(false);

  const registerUser = (ev) => {
    try {
      ev.preventDefault();
      console.log(Pol);
      if (Pol == null) {
        SetPol("Musko");
      }
      console.log(Email, Ime, Prezime, BrojTelefona, Lozinka, Pol);
      axios.post("http://localhost:3500/createKupac", {
        Email: Email,
        Ime: Ime,
        Prezime: Prezime,
        BrojTelefona: BrojTelefona,
        Lozinka: Lozinka,
        Pol: Pol,
      });
    } catch {
      console.log("vec postoji taj email");
    }
  };

  useEffect(() => {}, [email, ready, rehydrate]);

  if (email) {
    <div>Loading</div>;
    navigate("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={registerUser}
      >
        <div>
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Email:
          </label>
          <input
            type="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={Email}
            onChange={(ev) => SetEmail(ev.target.value)}
            required
          />

          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Lozinka:
          </label>

          <input
            type="Lozinka"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Lozinka"
            value={Lozinka}
            onChange={(ev) => SetLozinka(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Ime:
          </label>

          <input
            type="Ime"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ime"
            value={Ime}
            onChange={(ev) => SetIme(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Prezime:
          </label>

          <input
            type="Prezime"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Prezime"
            value={Prezime}
            onChange={(ev) => SetPrezime(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            BrojTelefona:
          </label>
          <input
            type="BrojTelefona"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="BrojTelefona"
            value={BrojTelefona}
            onChange={(ev) => SetBrojTelefona(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Pol:
          </label>

          <select
            type="Pol"
            className="border border-gray-300 w-full bg-white-200 text-black py-2 rounded-lg transition duration-300 "
            placeholder="Pol"
            value={Pol}
            onChange={(ev) => SetPol(ev.target.value)}
            required
          >
            <option value="Musko">Musko</option>
            <option value="Zensko">Zensko</option>
          </select>
        </div>
        <button
          onClick={registerUser}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
        >
          Registruj korisnika
        </button>
      </form>
    </div>
  );
};
export default UserRegister;
