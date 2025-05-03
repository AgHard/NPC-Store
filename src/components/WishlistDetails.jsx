import React, { useEffect, useState } from "react";
import axios from "axios";

const WishlistDetails = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] pt-24 text-white text-center">
        <p className="text-lg text-white">No items in your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="pb-4 mb-10 text-3xl font-bold border-b text-gold border-gold">
          Your Wishlist
        </h2>

        {items.map((item) => (
          <div
            key={item.package_id}
            className="bg-[#1c1c1c] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-white/10 mb-6"
          >
            <div className="flex items-center w-full gap-4 md:w-auto">
              <img
                src={item.image_url}
                alt="wishlist item"
                className="object-cover w-20 h-20 rounded-xl"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {item.amount} {item.currency}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {item.description_of_package}
                </p>
                <p className="mt-1 text-sm">Price: EGP {item.price_egp}</p>
              </div>
            </div>

            <div className="text-xl font-bold text-gold">EGP {item.price_egp}</div>
          </div>
        ))}
      </div>

      <footer className="py-6 mt-20 text-sm text-center text-gray-500 border-t border-white/10">
        Easy Access • Save Favorites • Happy Shopping!
      </footer>
    </div>
  );
};

export default WishlistDetails;
