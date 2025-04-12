import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      if (!email) {
        const { data } = axios
          .get("http://localhost:3500/userProfileInfo")
          .then(({ data }) => {
            setEmail(data);
            setReady(true);
          });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);
  return (
    <UserContext.Provider value={{ email, setEmail, ready }}>
      {children}
    </UserContext.Provider>
  );
}
