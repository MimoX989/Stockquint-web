"use client";
import React, { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const Providers = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [symData, setSymData] = useState({});
  const [marketStatus, setMarketStatus] = useState(null);
  const [selectExp, setSelectExp]=useState("");

  useEffect(() => {
    getMktStat();
  }, []);

  async function getMktStat() {
    try {
      const res = await axios.get("https://www.nseindia.com/api/marketStatus");
      setMarketStatus(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AppContext.Provider
          value={{
            marketStatus,
            symData,
            setSymData,
            user,
            setUser,
            isAuth,
            setIsAuth,
            selectExp,
            setSelectExp
          }}
        >
          {children}
        </AppContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
