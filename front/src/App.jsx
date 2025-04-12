import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import UserRegister from "./pages/RegisterPage";
import PocetnaPage from "./pages/PocetnaPage";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./context/UserContext";
import AdminPage from "./pages/AdminPage";
import "flowbite";
import StranicaZaSve from "./pages/StranicaZaSve";
import PosebanProizvod from "./pages/PosebanProizvod";

axios.defaults.baseURL = "http://localhost:3500";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PocetnaPage />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/:marka" element={<StranicaZaSve />}></Route>{" "}
          <Route
            path="/:marka/:tip/:jedanproizvod"
            element={<PosebanProizvod />}
          ></Route>{" "}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
