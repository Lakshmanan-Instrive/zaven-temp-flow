import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Note: Changed from `jwtDecode` to `jwt-decode` to match npm package

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const setToken = (newToken) => {
    if (newToken) {
      try {
        const decodedUser = jwtDecode(newToken);

        if (decodedUser.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        setToken_(newToken);
        setUser(decodedUser);
        setIsAuthenticated(true);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(decodedUser));
      } catch (error) {
        console.error("Token error:", error.message);
        setToken(null);
      }
    } else {
      setToken_(null);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
    }
  };

  const handleStorageEvent = (event) => {
    if (event.key === "token") {
      if (!event.newValue) {
        setToken(null);
        window.location.href = "/login";
      } else if (event.newValue !== token) {
        setToken(event.newValue);
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      setToken,
    }),
    [token, user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
