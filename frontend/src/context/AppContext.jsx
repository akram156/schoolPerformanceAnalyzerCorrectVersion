import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const [language, setLanguage] = useState("English");

  return (
    <AppContext.Provider
      value={{
        isLightMode,
        setIsLightMode,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
