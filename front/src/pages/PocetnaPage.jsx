import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PocetnaPage = () => {
  const [proizvod, setProizvod] = useState([]);
  const { email, ready, setEmail } = useContext(UserContext);
  const [rehydrate, setRehydrate] = useState(false);
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/rwaanime.appspot.com/o/images%2FSlika1.png?alt=media&token=146728fb-19d0-4466-b24b-44b9d8a6c3b9",
    "https://firebasestorage.googleapis.com/v0/b/rwaanime.appspot.com/o/images%2FSlika3.jpg?alt=media&token=6ad23491-72f8-45d1-bc71-c737479ce3da",
    "https://firebasestorage.googleapis.com/v0/b/rwaanime.appspot.com/o/images%2Fshogun-samurai-wallpaper.png?alt=media&token=adc39d55-3025-4125-8c4d-41d9760a639b",
    "https://firebasestorage.googleapis.com/v0/b/rwaanime.appspot.com/o/images%2FPuma.jpg?alt=media&token=2ee763bf-d194-4132-b6fa-37114df45f63",
  ];
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const getProizvod = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/vratiSveProizvode"
        );
        setProizvod(response.data);
        console.log(response);
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
  if (!ready) {
    return "Loading...";
  }
  return (
    <div>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 10 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-white  "
          >
            <img
              src={images[currentIndex]}
              alt={`Slika ${currentIndex + 1}`}
              className="w-full h-[70vh] object-cover shadow-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
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
    </div>
  );
};

export default PocetnaPage;
