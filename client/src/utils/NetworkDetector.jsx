import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context
const NetworkContext = createContext();

export const NetworkDetectorProvider = ({ children, onLogout }) => {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // State to track countdown
  let offlineTimer = null;
  let countdownInterval = null;

  useEffect(() => {
    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log("Network status:", condition);
      if (condition === "offline") {
        setIsDisconnected(true);
        startOfflineTimer();
      } else {
        setIsDisconnected(false);
        stopOfflineTimer(); // Clear timer if user is back online
      }
    };

    // Start a 5-minute timer when the user goes offline
    const startOfflineTimer = () => {
      setTimeLeft(1 * 60); // Set countdown to 5 minutes (in seconds)

      // Update countdown every second
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Timer to log out after 5 minutes
      offlineTimer = setTimeout(() => {
        console.log("User offline for 5 minutes, logging out...");
        onLogout(); // Call logout function when the timer expires
      }, 1 * 60 * 1000); // 5 minutes in milliseconds
    };

    // Stop the timer and countdown if the user comes back online
    const stopOfflineTimer = () => {
      if (offlineTimer) {
        clearTimeout(offlineTimer);
        offlineTimer = null;
      }
      if (countdownInterval) {
        clearInterval(countdownInterval);
        setTimeLeft(null); // Reset countdown
      }
    };

    handleConnectionChange(); // Check on mount
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
      stopOfflineTimer(); // Clean up timer when the component unmounts
    };
  }, [onLogout]);

  return (
    <NetworkContext.Provider value={{ isDisconnected, timeLeft }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Custom hook to use the NetworkContext
export const useNetwork = () => useContext(NetworkContext);
