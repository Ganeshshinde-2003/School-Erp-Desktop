import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const loginUser = async (data) => {
    try {
      setUserData(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logoutUser = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
