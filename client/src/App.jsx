import React, { useEffect } from "react";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import ChangePassword from "./pages/ChangePassword";
// import Home from "./pages/Home";
import AuthProvider from "./utils/AuthProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
