import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";


const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage or another secure location.
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("https://polyfinder-api-htfsexgcfde6dwby.westus3-01.azurewebsites.net/auth-user", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated){
    return <Navigate to="/" />;
  } else {return <Outlet />}
};

export default ProtectedRoutes;
