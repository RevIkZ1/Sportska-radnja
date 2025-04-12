import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const StranicaZaSve = () => {
  const { marka } = useParams();
  const [proizvod, setProizvod] = useState([]);
  const { email, ready, setEmail } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    function capitalizeFirstLetter(string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const getProizvod = async () => {
      const marka1 = capitalizeFirstLetter(marka);
      console.log(marka1);
      try {
        const response = await axios.get(
          `http://localhost:3500/vratiProizvodePoBrendu?marka=${marka1}`
        );
        console.log(response.data);
        setProizvod(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getProizvod();
  }, [proizvod]);
  const handlePodmeniClick = (marka2, glavnitip2, jedanproizvod) => {
    navigate(
      `/${marka2.toLowerCase()}/${glavnitip2.toLowerCase()}/${jedanproizvod}`
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {proizvod.length > 0 &&
        proizvod.map((proizvod) => (
          <div
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center"
            key={proizvod._id}
            onClick={() =>
              handlePodmeniClick(
                proizvod.marka,
                proizvod.glavnitip,
                proizvod._id
              )
            }
          >
            <img
              src={proizvod?.slika}
              alt={proizvod?.imeProizvoda}
              className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-center mb-2">
              {proizvod?.imeProizvoda}
            </h2>
            <p className="text-gray-700 mb-4">{proizvod?.cena} RSD</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition duration-200">
              Dodaj u korpu
            </button>
          </div>
        ))}
    </div>
  );
};
export default StranicaZaSve;
