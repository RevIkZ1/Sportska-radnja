import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
const PosebanProizvod = () => {
  const { jedanproizvod } = useParams();
  const { email, ready, setEmail } = useContext(UserContext);
  const [proizvod, setProizvod] = useState();
  useEffect(() => {
    const getProizvod = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/vratiProizvodePoID?_id=${jedanproizvod}`
        );
        setProizvod(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getProizvod();
  }, [proizvod]);

  const [izabranaVelicina, setIzabranaVelicina] = useState(null);

  const handleClick = (velicina) => {
    setIzabranaVelicina(velicina);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full  bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-200 p-4 flex items-center justify-center">
            <img
              src={proizvod?.slika}
              alt={proizvod?.imeProizvoda}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          <div className="p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {proizvod?.imeProizvoda}
              </h1>

              <div className="text-2xl font-semibold text-green-500 mb-6">
                {proizvod?.cena},00 RSD
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {proizvod?.velicina?.length > 0 &&
                proizvod.velicina.map((velicina) => (
                  <button
                    key={velicina}
                    onClick={() => handleClick(velicina)}
                    className={`px-4 py-2 rounded-xl border transition 
              ${
                izabranaVelicina === velicina
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
                  >
                    {velicina}
                  </button>
                ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg transition duration-200 w-full sm:w-auto">
                Dodaj u korpu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PosebanProizvod;
