import { Button } from "@mui/material";

export function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div
      role="alert"
      className="h-screen flex flex-col items-center justify-center"
    >
      <p>Something went wrong</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button variant="outlined" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}
