import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Note: Changed from `jwtDecode` to `jwt-decode` to match npm package
import { refresh_token_call } from "../store/slices/RefreshTokenSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [timeoutId, setTimeoutId] = useState(null);

  const setToken = (newToken) => {
    if (newToken) {
      try {
        const decodedUser = jwtDecode(newToken);

        if (decodedUser.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }
        setUser(decodedUser.data);
        setToken_(newToken);
        setIsAuthenticated(true);
        scheduleTokenRefresh(decodedUser.exp * 1000, decodedUser.data._id);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(decodedUser.data));
        localStorage.setItem("expiryAt", decodedUser.exp * 1000);
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

  const scheduleTokenRefresh = (expiryAt, userId) => {
    const expiresIn = expiryAt - Date.now();
    const refreshTime = expiresIn - 1000 * 60 * 5; // 5 minutes before expiry
    if (refreshTime > 0) {
      const id = setTimeout(() => {
        refreshTokenCall(userId);
      }, refreshTime);
      setTimeoutId(id);
    } else {
      refreshTokenCall(userId);
    }
  };

  const refreshTokenCall = async (userId) => {
    const response = await dispatch(refresh_token_call({ userId }));
    if (response.payload.accessToken) setToken(response.payload.accessToken);
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  useEffect(() => {
    if (user?.exp * 1000 && user?._id)
      scheduleTokenRefresh(user?.exp * 1000, user?._id);
  }, [token]);

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
