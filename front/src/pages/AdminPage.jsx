import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

const AdminPage = () => {
  const [imeProizvoda, SetImeProizvoda] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [kompolujenamenjen, SetKomPoluJeNamenjen] = useState();
  const [marka, SetMarka] = useState();
  const [cena, SetCena] = useState();
  const [boja, SetBoja] = useState();
  const [glavnitip, SetGlavniTip] = useState();
  const [pomocnitip, SetPomocniTip] = useState();
  const [izabraneVelicine, setIzabraneVelicine] = useState([]);
  const sveVelicine = [42, 43, 44, 45, 46];
  const [update, setUpdate] = useState(false);

  const [slika, setSlika] = useState(false);
  const Obuca = ["Patike", "Cizme", "Papuce"];
  const Odeca = ["Jakne", "Sakoi", "Trenerke"];
  const Aksesoari = ["Ranac", "Lopta", "Teretana"];
  const opcijeZaPrikaz =
    glavnitip === "Obuca"
      ? Obuca
      : glavnitip === "Odeca"
      ? Odeca
      : glavnitip === "Aksesoari"
      ? Aksesoari
      : [];
  const { email, ready, setEmail1 } = useContext(UserContext);
  const [rehydrate, setRehydrate] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleCheckboxChange = (velicina) => {
    if (izabraneVelicine.includes(velicina)) {
      setIzabraneVelicine(izabraneVelicine.filter((v) => v !== velicina));
    } else {
      setIzabraneVelicine([...izabraneVelicine, velicina]);
    }
  };
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setImageUpload(selectedFile);
    }
  };
  const handleImageUpload2 = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setImageUpload(selectedFile);
      setSlika(true);
    }
  };
  useEffect(() => {
    const checkRole = async () => {
      console.log(email);
      if (email && email.Role !== "Kupac") {
        await new Promise((resolve) => setTimeout(resolve, 6000));
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
      }
    };

    checkRole();
  }, [email, navigate]);

  const createProizvod = (ev) => {
    ev.preventDefault();
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (kompolujenamenjen == undefined) {
          SetKomPoluJeNamenjen("Musko");
        }
        const data = {
          kompolujenamenjen: kompolujenamenjen,
          slika: url,
          marka: marka,
          cena: cena,
          boja: boja,
          glavnitip: glavnitip,
          pomocnitip: pomocnitip,
          velicina: izabraneVelicine,
          imeProizvoda: imeProizvoda,
        };
        console.log(data, "..dsadsa");
        axios
          .post("http://localhost:3500/kreirajProizvod", data)
          .then(function (response) {
            setRehydrate(!rehydrate);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    });
  };

  useEffect(() => {}, [email, ready, rehydrate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={createProizvod}
      >
        <div>
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Ime Proizvoda:
          </label>
          <input
            type="imeProizvoda"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="imeProizvoda"
            value={imeProizvoda}
            onChange={(ev) => SetImeProizvoda(ev.target.value)}
            required
          />

          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Marka:
          </label>

          <select
            type="marka"
            className="border border-gray-300 w-full bg-white-200 text-black py-2 rounded-lg transition duration-300 "
            placeholder="glavnitip"
            value={marka}
            onChange={(ev) => {
              SetMarka(ev.target.value);
            }}
            required
          >
            {" "}
            <option value="">Izaberi marku</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="On">On</option>
          </select>
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Cena:
          </label>

          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="cena"
            value={cena}
            onChange={(ev) => SetCena(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Boja:
          </label>

          <input
            type="boja"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="boja"
            value={boja}
            onChange={(ev) => SetBoja(ev.target.value)}
            required
          />
          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Glavni Tip:
          </label>

          <select
            type="glavnitip"
            className="border border-gray-300 w-full bg-white-200 text-black py-2 rounded-lg transition duration-300 "
            placeholder="glavnitip"
            value={glavnitip}
            onChange={(ev) => {
              SetGlavniTip(ev.target.value);
              SetPomocniTip("");
            }}
            required
          >
            {" "}
            <option value="">Izaberi tip</option>
            <option value="Odeca">Odeca</option>
            <option value="Obuca">Obuca</option>
            <option value="Aksesoari">Aksesoari</option>
          </select>

          {glavnitip && (
            <div>
              <label className="block text-xl font-semibold mb-2 text-gray-800">
                Pomoćni tip:
              </label>
              <select
                className="border border-gray-300 w-full bg-white text-black py-2 px-3 rounded-lg"
                value={pomocnitip}
                onChange={(e) => SetPomocniTip(e.target.value)}
                required
              >
                <option value="">Izaberi pomoćni tip</option>
                {opcijeZaPrikaz.map((opcija, index) => (
                  <option key={index} value={opcija}>
                    {opcija}
                  </option>
                ))}
              </select>
            </div>
          )}

          <label className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Pol:
          </label>

          <select
            type="kompolujenamenjen"
            className="border border-gray-300 w-full bg-white-200 text-black py-2 rounded-lg transition duration-300 "
            placeholder="kompolujenamenjen"
            value={kompolujenamenjen}
            onChange={(ev) => SetKomPoluJeNamenjen(ev.target.value)}
            required
          >
            <option value="Musko">Musko</option>
            <option value="Zensko">Zensko</option>
          </select>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold text-gray-800">
              Izaberi veličine:
            </label>

            <div className="flex flex-wrap gap-4">
              {sveVelicine.map((velicina) => (
                <label key={velicina} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={velicina}
                    checked={izabraneVelicine.includes(velicina)}
                    onChange={() => handleCheckboxChange(velicina)}
                  />
                  {velicina}
                </label>
              ))}
            </div>

            <div className="mt-4 text-gray-700">
              <strong>Izabrane veličine:</strong>{" "}
              {izabraneVelicine.length > 0
                ? `[${izabraneVelicine.join(", ")}]`
                : "Nijedna"}
            </div>
          </div>

          <label className="">Slika</label>
          {!update && (
            <input className="input" type="file" onChange={handleImageUpload} />
          )}
          {update && (
            <input
              className="input"
              type="file"
              onChange={handleImageUpload2}
            />
          )}
        </div>
        <button
          onClick={createProizvod}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
        >
          Kreiraj proizvod
        </button>
      </form>
    </div>
  );
};
export default AdminPage;
