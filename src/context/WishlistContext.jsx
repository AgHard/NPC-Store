import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  const addToWishlist = async (package_id) => {
    try {
      await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { package_id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchWishlist();
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (package_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/remove/${package_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
