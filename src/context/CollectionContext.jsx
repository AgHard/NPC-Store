import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CollectionContext = createContext();

export const useCollections = () => useContext(CollectionContext);

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/collections");
      setCollections(res.data);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <CollectionContext.Provider value={{ collections, fetchCollections }}>
      {children}
    </CollectionContext.Provider>
  );
};
