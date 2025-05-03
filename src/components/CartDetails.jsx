import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const CartDetails = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-white">Please login to view your cart.</p>;
  if (cartItems.length === 0) return <p className="text-white">No products in the cart.</p>;

  const subtotal = cartItems
    .reduce((total, item) => total + item.price_egp * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="pb-4 mb-10 text-3xl font-bold text-yellow-400 border-b border-yellow-400">
          Your Cart
        </h2>

        {cartItems.map((item) => {
          const itemTotal = (item.price_egp * item.quantity).toFixed(2);

          return (
            <div
              key={item.cart_id}
              className="bg-[#1c1c1c] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-white/10 mb-6"
            >
              <div className="flex items-center w-full gap-4 md:w-auto">
                <img
                  src={item.image_url}
                  alt={item.description_of_package}
                  // if the user has bad internet then the image will not load and the alternative text will be shown
                  className="object-cover w-20 h-20 rounded-xl"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.amount} {item.currency}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-400">{item.description_of_package}</p> */}
                  <p className="mt-1 text-sm text-gray-400">Unit Price: EGP {item.price_egp}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    item.quantity > 1 &&
                    updateQuantity(item.package_id, item.quantity - 1)
                  }
                  className="px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg"
                >
                  −
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.package_id, item.quantity + 1)
                  }
                  className="px-3 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.package_id)}
                  className="ml-4 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="text-xl font-bold text-yellow-400">EGP {itemTotal}</div>
            </div>
          );
        })}

        {/* Subtotal & Checkout */}
        <div className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 text-right shadow-lg">
          <div className="text-base text-gray-300">Subtotal:</div>
          <div className="mt-2 text-2xl font-bold text-yellow-400">EGP {subtotal}</div>
          <button className="px-6 py-2 mt-6 font-semibold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-300">
            Proceed to Checkout
          </button>
        </div>
      </div>

      <footer className="py-6 mt-20 text-sm text-center text-gray-500 border-t border-white/10">
        Email Delivery • Secure Payment • Best Prices • Happy Customers
      </footer>
    </div>
  );
};

export default CartDetails;
