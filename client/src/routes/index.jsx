import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "../pages/Common/Register";
import Login from "../pages/Common/Login";
import ChangePassword from "../pages/Common/ChangePassword";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "../utils/ErrorBoundary";
import NotFound from "../pages/Common/NotFound";
import { menuConfig } from "../utils/MenuConfig";
import MenuComponent from "../reusable/Menu";
import { useIdle } from "../utils/IdleTimeout";
import { useNetwork } from "../utils/NetworkDetector";

const Routes = () => {
  const { isIdle } = useIdle();
  const { isDisconnected } = useNetwork();
  const { token, user } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
  ];

  const generateProtectedRoutes = (userRole) => {
    const roleRoutes = menuConfig[userRole] || [];
    return roleRoutes
      ? [
          {
            path: "/",
            element: (
              <>
                <ProtectedRoute />
                <MenuComponent role={userRole} />
              </>
            ),
            children: roleRoutes.map((route) => ({
              path: route.link,
              element: route.element,
            })),
          },
        ]
      : [];
  };
  const routesFor404 = [
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...generateProtectedRoutes(user?.role),
    ...routesFor404,
  ]);

  function logErrorToService(error, info) {
    // Use your preferred error logging service
    console.error("Caught an error:", error, info);
  }
  // Provide the router configuration using RouterProvider
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={() => {
        window.location.href = "/login";
      }}
      onError={logErrorToService}
    >
      {isIdle ? (
        <div>Idle</div>
      ) : isDisconnected ? (
        <div>Your Internet Connection Lost</div>
      ) : (
        <>
          {user?.role && <MenuComponent role={user.role} />}
          <RouterProvider router={router}></RouterProvider>
        </>
      )}
    </ErrorBoundary>
  );
};

export default Routes;
