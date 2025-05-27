import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const FlipCard = ({ pkg }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleClick = (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (!user) {
    Swal.fire({
      icon: 'error',
      title: 'Add to Cart Failed',
      text: 'You must Login first',
    });
    return;
  }

  addToCart(pkg);

  Swal.fire({
    icon: 'success',
    title: 'Added to Cart!',
    text: `package has been added to your cart.`,
    cancelButtonText: 'Continue Shopping',
    confirmButtonColor: '#FFD700',
    background: '#1E1E1E',
    color: 'white',
  });
};


  const discount = pkg.original_price
    ? Math.round(((pkg.original_price - pkg.price_egp) / pkg.original_price) * 100)
    : null;

  const goldColor = "#FFD700";
  const fontFamily = "'Cairo', sans-serif";

  return (
    <Link to={`/games/${pkg.game_id}/packages/${pkg.id}`} style={{ fontFamily }}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-[#1f1f1f] p-4 shadow-lg hover:shadow-yellow-500/10 border border-[#333] transition-all flex flex-col justify-between h-full"
      >
        <div>
          <div className="relative">
            <div
              className="absolute z-10 flex items-center gap-2 px-2 py-1 text-sm rounded-full shadow top-2 left-2"
              style={{
                backgroundColor: "#2e2e2e",
                color: goldColor,
                fontFamily,
              }}
            >
              <Star className="w-4 h-4" color={goldColor} />
              <span style={{ color: "white" }}>4.9</span>
            </div>

            <motion.img
              src={pkg.image_url}
              alt={pkg.description_of_package}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 8px 20px rgba(255, 215, 0, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 150 }}
              className="object-cover w-full h-64 mb-3 rounded-lg"
            />
          </div>

          <h3 className="mb-1 text-lg font-semibold text-center text-white">
            {pkg.amount} {pkg.currency}
          </h3>

          <div className="mb-3 text-center">
            <div className="text-xl font-bold" style={{ color: goldColor }}>
              {pkg.price_egp} EGP
            </div>
            {discount && (
              <div className="mt-1 text-sm" style={{ color: "#bbb" }}>
                <s>{pkg.original_price} EGP</s> –{" "}
                <span style={{ color: goldColor }}>{discount}% OFF</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleClick}
          className={`w-full py-2 font-medium rounded-md transition duration-200 ${
            user
              ? "text-black hover:opacity-90"
              : "bg-gray-700 text-white cursor-not-allowed"
          }`}
          style={{
            backgroundColor: user ? goldColor : "#555",
            fontFamily,
            fontWeight: 600,
          }}
        >
          Add to Cart
        </button>
      </motion.div>
    </Link>
  );
};

export default FlipCard;
