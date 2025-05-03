import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // 👈 important

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // 👈 track auth state
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  // React to login/logout
  useEffect(() => {
    if (user) {
      fetchCart(); // fetch when logged in
    } else {
      setCartItems([]); // clear cart on logout
    }
  }, [user]);

  const addToCart = async (pkg) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          package_id: pkg.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateQuantity = async (package_id, quantity) => {
    try {
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { package_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeFromCart = async (package_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${package_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
