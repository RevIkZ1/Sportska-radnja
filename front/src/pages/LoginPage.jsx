import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [active, setActive] = useState("");
  const { setEmail } = useContext(UserContext);
  const [Email, setEmail1] = useState("");
  const [lozinka, setLozinka] = useState("");
  const navigate = useNavigate();
  const { email, ready, setEmai } = useContext(UserContext);
  const [rehydrate, setRehydrate] = useState(false);

  const log = async (ev) => {
    ev.preventDefault();
    console.log(Email, lozinka);
    const response = await axios.post(
      "http://localhost:3500/login",
      {
        Email: Email,
        Lozinka: lozinka,
      },
      { withCredentials: true }
    );
    console.log(response.data);
    setEmail(response.data);
    console.log(Email);
    navigate("/");
  };
  useEffect(() => {}, [active]);
  useEffect(() => {}, [email, ready, rehydrate]);

  if (email) {
    <div>Loading</div>;
    navigate("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form
        onSubmit={log}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Prijavi se
        </h2>

        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 mb-2">
            Korisničko ime:
          </label>
          <input
            type="text"
            id="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Unesi Email"
            value={Email}
            onChange={(ev) => setEmail1(ev.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lozinka" className="block text-gray-700 mb-2">
            Lozinka:
          </label>
          <input
            type="password"
            id="lozinka"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Unesi lozinku"
            value={lozinka}
            onChange={(ev) => setLozinka(ev.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
