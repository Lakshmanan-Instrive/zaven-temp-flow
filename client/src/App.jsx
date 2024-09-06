import React, { useEffect } from "react";
// import { io } from "socket.io-client";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ChangePassword from "./pages/ChangePassword";
// import Home from "./pages/Home";
import AuthProvider from "./utils/AuthProvider";
import Routes from "./routes";

// const socket = io("http://localhost:3000");

function App() {
  // useEffect(() => {
  //   // Register the user with the WebSocket server
  //   const userId = localStorage.getItem("user")._id; // Assume the userId is stored on login
  //   socket.emit("register", userId);

  //   // Listen for logout event
  //   socket.on("forceLogout", (data) => {
  //     alert(data.message); // Notify the user

  //     // Clear token and log out the user
  //     localStorage.clear();
  //     window.location.href = "/login"; // Redirect to login page
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
