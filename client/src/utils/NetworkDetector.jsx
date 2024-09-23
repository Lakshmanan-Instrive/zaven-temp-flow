import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context
const NetworkContext = createContext();

export const NetworkDetectorProvider = ({ children }) => {
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log("Network status:", condition);
      if (condition === "offline") {
        setIsDisconnected(true);
      }else{
        setIsDisconnected(false);
      }
    };

    handleConnectionChange(); // Check on mount
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isDisconnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Custom hook to use the NetworkContext
export const useNetwork = () => useContext(NetworkContext);
