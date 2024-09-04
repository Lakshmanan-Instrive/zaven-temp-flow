import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") setIsHome(true);
    else setIsHome(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>{isHome ? "Please Login For Access The Home Page" : "404 page not found"} </h1>
      <Button
        variant="outlined"
        onClick={() => (window.location.href = "/login")}
      >
       Click Here For Login Page
      </Button>
    </div>
  );
};

export default NotFound;
