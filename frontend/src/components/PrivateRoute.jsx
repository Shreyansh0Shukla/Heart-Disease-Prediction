import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../appwriteConfig";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    account.get().then(
      () => setIsAuthenticated(true),
      () => setIsAuthenticated(false)
    );
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
