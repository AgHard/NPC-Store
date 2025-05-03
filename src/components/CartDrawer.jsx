import React, { useContext } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = ({ setIsCartOpen }) => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price_egp * item.quantity, 0);
  const goldColor = "#FFD700";
  const fontFamily = "'Cairo', sans-serif";

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 z-[100] h-screen w-full max-w-xs sm:max-w-sm bg-[#111] text-white shadow-xl flex flex-col"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid #333",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Shopping Cart</h2>
        <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" style={{ color: "#fff" }}>
          <FiX size={22} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 text-gray-500 w-14 h-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9"
              />
            </svg>
            <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "1rem" }}>
              No products in the cart.
            </p>
            <Link
              to="/cartdetails"
              style={{
                display: "inline-block",
                backgroundColor: goldColor,
                color: "#000",
                padding: "10px 16px",
                borderRadius: "8px",
                marginBottom: "0.5rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View Cart
            </Link>
            <br />
            <Link
              to="/"
              style={{
                display: "inline-block",
                border: "1px solid #fff",
                padding: "10px 16px",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Return to Home
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.package_id} className="flex items-center pb-3 mb-4 border-b border-gray-700">
              <img
                src={item.image_url}
                alt={item.description_of_package}
                className="object-cover w-16 h-16 mr-4 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.amount} {item.currency}</h3>
                <p className="text-sm text-gray-400">{item.price_egp} EGP</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.package_id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-700 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.package_id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-700 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.package_id)} className="ml-2 text-red-500">
                <FiTrash2 />
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-700">
          <p className="text-lg font-semibold text-right text-green-400">Total: {total} EGP</p>
          <Link
            to="/cartdetails"
            className="block w-full py-2 mt-2 text-center bg-green-600 rounded hover:bg-green-700"
          >
            View Cart
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CartDrawer;
