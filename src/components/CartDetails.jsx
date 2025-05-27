import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import  {useNavigate} from "react-router-dom";

const CartDetails = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";

  if (!user) {
    return (
      <p
        className="text-center mt-28"
        style={{ color: "white", fontFamily }}
      >
        Please login to view your cart.
      </p>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ backgroundColor: "#0f0f0f", color: "#fff", fontFamily }}
      >
        <h2 className="mb-2 text-2xl font-semibold">No products in your cart</h2>
        <p className="mb-6 text-gray-400">Looks like you haven’t added anything yet.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 font-semibold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-300"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const subtotal = cartItems
    .reduce((total, item) => total + item.price_egp * item.quantity, 0)
    .toFixed(2);

  return (
    <div
      className="min-h-screen px-4 pt-24"
      style={{ backgroundColor: "#0f0f0f", color: "white", fontFamily }}
    >
      <div className="w-full max-w-6xl mx-auto mt-8">
        <h2
          className="pb-4 mb-10 text-3xl font-bold border-b"
          style={{ color: goldColor, borderColor: goldColor }}
        >
          Your Cart
        </h2>

        <AnimatePresence>
          {cartItems.map((item) => {
            const itemTotal = (item.price_egp * item.quantity).toFixed(2);

            return (
              <motion.div
                key={item.cart_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
                className="bg-[#1c1c1c] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-white/10 mb-6"
              >
                <div className="flex items-center w-full gap-4 md:w-auto">
                  <img
                    src={item.image_url}
                    alt={item.description_of_package}
                    className="object-cover w-20 h-20 rounded-xl"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.amount} {item.currency}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Unit Price: EGP {item.price_egp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={async () => {
                      if (item.quantity > 1) {
                        setLoadingId(item.package_id);
                        await updateQuantity(item.package_id, item.quantity - 1);
                        setLoadingId(null);
                      }
                    }}
                    disabled={loadingId === item.package_id}
                    className="px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg disabled:opacity-50"
                  >
                    −
                  </button>
                  <motion.span
                    key={item.quantity}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-lg font-medium"
                  >
                    {item.quantity}
                  </motion.span>
                  <button
                    onClick={async () => {
                      setLoadingId(item.package_id);
                      await updateQuantity(item.package_id, item.quantity + 1);
                      setLoadingId(null);
                    }}
                    disabled={loadingId === item.package_id}
                    className="px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg disabled:opacity-50"
                  >
                    +
                  </button>
                  <button
                    onClick={async () => {
                      setLoadingId(item.package_id);
                      await removeFromCart(item.package_id);
                      setLoadingId(null);
                    }}
                    className="ml-4 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="text-xl font-bold" style={{ color: goldColor }}>
                  EGP {itemTotal}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Subtotal & Checkout */}
        <div className="md:sticky md:top-24">
          <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 text-right shadow-lg">
            <div className="text-base text-gray-300">Subtotal:</div>
            <div className="mt-2 text-2xl font-bold" style={{ color: goldColor }}>
              EGP {subtotal}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Instant delivery after secure payment
            </p>
            <button
              className="px-6 py-2 mt-6 font-semibold transition rounded-full"
              style={{ backgroundColor: goldColor, color: "#000", fontFamily }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6c200")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = goldColor)}
              onClick={() => navigate("/checkout", { state: { subtotal } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <footer className="py-6 mt-20 text-sm text-center text-gray-500 border-t border-white/10">
        Email Delivery • Secure Payment • Best Prices • Happy Customers
      </footer>
    </div>
  );
};

export default CartDetails;