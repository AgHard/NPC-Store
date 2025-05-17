import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold text-gold">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/games" className="text-blue-300 hover:underline">Manage Games</Link>
        </li>
        <li>
          <Link to="/admin/packages" className="text-blue-300 hover:underline">Manage Packages</Link>
        </li>
        <li>
          <Link to="/admin/collections" className="text-blue-300 hover:underline">Manage Collections</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
