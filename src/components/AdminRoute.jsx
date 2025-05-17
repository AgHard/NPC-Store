import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Simulate hydration or localStorage sync delay
    const timer = setTimeout(() => {
      setChecking(false);
    }, 50); // 50ms is usually enough

    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return <div className="mt-20 text-center text-white">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
