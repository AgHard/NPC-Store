import React, { useState } from "react";
import { FaGamepad, FaBoxOpen, FaLayerGroup } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import GameManager from "./GameManager";
import PackageManagerByGame from "./PackageManagerByGame";
import CollectionManager from "./CollectionManager";
import AnnouncementManager from "./AnnouncementManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("games");

  const renderComponent = () => {
    switch (activeTab) {
      case "games":
        return <GameManager />;
      case "packages":
        return <PackageManagerByGame />;
      case "collections":
        return <CollectionManager />;
      case "announcements":
        return <AnnouncementManager />;
      default:
        return <GameManager />;
    }
  };

  return (
    <div className="flex min-h-screen text-white bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e1e1e] border-r border-gray-800 p-6 space-y-4 shadow-lg pt-12">
        <h2 className="mb-6 text-2xl font-bold text-gold">Admin Panel</h2>

        {/* Sidebar Button */}
        <button
          onClick={() => setActiveTab("games")}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition ${
            activeTab === "games"
              ? "bg-gray-700 text-gold border-l-4 border-gold"
              : "text-white"
          }`}
        >
          <FaGamepad className="text-xl" />
          <span className="text-lg">Manage Games</span>
        </button>

        <button
          onClick={() => setActiveTab("packages")}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition ${
            activeTab === "packages"
              ? "bg-gray-700 text-gold border-l-4 border-gold"
              : "text-white"
          }`}
        >
          <FaBoxOpen className="text-xl" />
          <span className="text-lg">Manage Packages</span>
        </button>

        <button
          onClick={() => setActiveTab("collections")}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition ${
            activeTab === "collections"
              ? "bg-gray-700 text-gold border-l-4 border-gold"
              : "text-white"
          }`}
        >
          <FaLayerGroup className="text-xl" />
          <span className="text-lg">Manage Collections</span>
        </button>
        
        <button
          onClick={() => setActiveTab("announcements")}
          className={`flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition ${
            activeTab === "announcements"
              ? "bg-gray-700 text-gold border-l-4 border-gold"
              : "text-white"
          }`}
        >
          <FaLayerGroup className="text-xl" />
          <span className="text-lg">Manage Announcements</span>
        </button>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {renderComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
