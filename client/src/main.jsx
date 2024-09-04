import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@mui/material";
import { fallbackRender } from "./utils/ErrorBoundary";
// import FallBackComponent from "./utils/ErrorBoundary";

function logErrorToService(error, info) {
  // Use your preferred error logging service
  console.error("Caught an error:", error, info);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={() => {
        window.location.href = "/login";
      }}
      onError={logErrorToService}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
