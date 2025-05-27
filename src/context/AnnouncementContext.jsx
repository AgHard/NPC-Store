import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AnnouncementContext = createContext();

export const useAnnouncement = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);

  const fetchActiveAnnouncement = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements/active");
      setActiveAnnouncement(res.data);
    } catch (err) {
      setActiveAnnouncement(null); // if 404, set to null
    }
  };

  useEffect(() => {
    fetchActiveAnnouncement();
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{ activeAnnouncement, fetchActiveAnnouncement }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};
