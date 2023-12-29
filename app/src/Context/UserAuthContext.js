import React, { createContext, useContext, useState, useEffect } from "react";
import { getSpecificUser } from "../api/Authapi/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const loginUser = async (docId) => {
    try {
      const userDataFromDB = await getSpecificUser(docId);
      console.log(userDataFromDB);
      storeData(userDataFromDB);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const storeData = async (data) => {
    setUserData(data);
  };

  const logoutUser = () => {
    storeData(null);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
