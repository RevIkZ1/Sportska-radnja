import "../App.css";
import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const texts = [
    "Besplatna dostava za porudžbine preko 3000 rsd!",
    "Stigli su novi proizvodi",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { email, ready, setEmail } = useContext(UserContext);
  const [rehydrate, setRehydrate] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const logout = async (ev) => {
    ev.preventDefault();
    const response = await axios
      .post("http://localhost:3500/logout", {}, { withCredentials: true })
      .then(({ data }) => {
        setEmail(null);
        navigate("/");
      });
  };
  const [brendOpen, setBrendOpen] = useState(false);

  const handleBrendMouseEnter = () => {
    setBrendOpen(true);
  };

  const handleBrendMouseLeave = () => {
    setBrendOpen(false);
  };

  const handlePodmeniClick = (nazivStranice) => {
    navigate(`/${nazivStranice.toLowerCase()}`);
    setBrendOpen(false);
  };
  useEffect(() => {}, [email, ready, rehydrate]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center w-full ">
        <div className="w-full max-w-xl ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-xl shadow-md p-4 text-center text-base text-gray-800"
            >
              {texts[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <a className="text-xl font-bold" href="http://localhost:3000/">
          RevSport
        </a>

        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Pretraži..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative">
            🛒
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"></span>
          </button>
          {!email && (
            <a href="/register" className=" color-black hover-color-light-blue">
              Registracija
            </a>
          )}
          {!!email && (
            <a
              href="/"
              onClick={logout}
              className="mr-4 color-black hover-color-light-blue"
            >
              Odjavi se
            </a>
          )}
          {!email && (
            <a
              href="/login"
              className="ml-2 color-black hover-color-light-blue move15"
            >
              Login
            </a>
          )}
        </div>
      </div>
      <div className="flex justify-between px-4 py-4 bg-gray-100 z-1">
        <div
          className="relative inline-block text-left z-10"
          onMouseLeave={handleBrendMouseLeave}
        >
          <div onMouseEnter={handleBrendMouseEnter}>
            <button
              type="button"
              className="bg-white text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Brendovi
            </button>
          </div>

          {brendOpen && (
            <div
              className="absolute left-0  w-48 bg-white rounded-md shadow-lg z-20"
              onMouseEnter={handleBrendMouseEnter}
              onMouseLeave={handleBrendMouseLeave}
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handlePodmeniClick("Nike")}
                >
                  Nike
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handlePodmeniClick("Adidas")}
                >
                  Adidas
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handlePodmeniClick("Puma")}
                >
                  Puma
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handlePodmeniClick("On")}
                >
                  On
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
