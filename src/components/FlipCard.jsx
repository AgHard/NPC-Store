import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ import context
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
const clickSound = new Howl({ src: ["/sounds/click.mp3"], volume: 0.5 });

const FlipCard = ({ pkg }) => {
  const { user } = useContext(AuthContext); // ✅ get user
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      const msg ='You must Login first';
        
            Swal.fire({
              icon: 'error',
              title: 'Add to Card Failed',
              text: msg,
            });
      // navigate("/login");
      return;
    }

    clickSound.play();
    // TODO: Add actual "add to cart" logic here
    addToCart(pkg);
  };

  const discount = pkg.original_price
    ? Math.round(((pkg.original_price - pkg.price_egp) / pkg.original_price) * 100)
    : null;

  return (
    <Link to={`/games/${pkg.game_id}/packages/${pkg.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="rounded-xl bg-[#1f1f1f] p-4 shadow-lg hover:shadow-cyan-500/30 border border-gray-700 transition duration-300 flex flex-col justify-between h-full"
      >
        <div>
          <div className="relative">
            <div className="absolute z-10 flex items-center gap-2 px-2 py-1 text-sm text-white bg-purple-700 rounded-full shadow-md top-2 left-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span>4.9</span>
            </div>

            <motion.img
              src={pkg.image_url}
              alt={pkg.description_of_package}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0 8px 20px rgba(0, 255, 255, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 150 }}
              className="object-cover w-full h-64 mb-3 rounded-lg"
            />
          </div>

          <h3 className="mb-1 text-lg font-semibold text-center text-white">
            {pkg.amount} {pkg.currency}
          </h3>

          <div className="mb-3 text-center">
            <div className="text-xl font-bold text-red-400">
              {pkg.price_egp} EGP
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className={`w-full py-2 font-medium rounded-md transition ${
            user
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-gray-600 text-white cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </motion.div>
    </Link>
  );
};

export default FlipCard;
