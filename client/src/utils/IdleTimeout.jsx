import React, { createContext, useContext, useEffect, useState } from "react";
import { logout_call } from "../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

// Create Idle Context
const IdleContext = createContext();

export const useIdle = () => {
  return useContext(IdleContext);
};

// Idle Provider Component
export const IdleProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [isIdle, setIsIdle] = useState(false);
  const timeoutDuration = 10000; // 10 seconds

  const logout = async (token) => {
    const response = await dispatch(logout_call({ token }));
    if (response.payload) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const resetIdleTimer = () => {
    console.log("Resetting idle timer...");
    setIsIdle(false);

    // Clear existing timeout
    if (typeof resetIdleTimer.timeoutId !== "undefined") {
      clearTimeout(resetIdleTimer.timeoutId);
    }

    // Set new timeout
    resetIdleTimer.timeoutId = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsIdle(true);
        // alert("You have been idle for too long. You will be logged out.");
        // logout(token);
      }
      console.log("User is idle");
    }, timeoutDuration);
  };

  useEffect(() => {
    const events = ["mousemove", "keypress", "click", "scroll", "touchstart"];

    // Add event listeners to reset the idle timer
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    resetIdleTimer(); // Start the timer on mount

    return () => {
      // Cleanup on unmount
      if (typeof resetIdleTimer.timeoutId !== "undefined") {
        clearTimeout(resetIdleTimer.timeoutId);
      }
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <IdleContext.Provider value={{ isIdle }}>{children}</IdleContext.Provider>
  );
};
