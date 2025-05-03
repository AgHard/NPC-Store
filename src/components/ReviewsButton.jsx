import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReviewsButton = () => {
  return (
    <Link
      to="https://www.facebook.com/NPCST0RE/photos/a.110782981701500/138145835631881/"
      className="fixed right-0 z-50 flex items-center gap-2 px-5 py-3 text-white transition-transform duration-300 transform rotate-90 -translate-y-1/2 rounded-full shadow-lg top-1/2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-400 shadow-yellow-500/30 hover:scale-105 group"
    >
      <FaStar className="text-white animate-spin-slow" />
      <span className="font-semibold">Reviews</span>
    </Link>
  );
};

export default ReviewsButton;
