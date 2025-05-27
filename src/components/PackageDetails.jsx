import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FlipCard from "./FlipCard";
import Swal from "sweetalert2";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // 👈 Needed to access addToCart & updateQuantity

const PackageDetails = () => {
  const { group_id, package_id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1); // ✅ Quantity state

  const { addToWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const {cartItems, addToCart, updateQuantity } = useContext(CartContext); // ✅ Use cart context

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/games/${group_id}/packages/${package_id}`
        );
        setPkg(res.data);

        const relatedRes = await axios.get(
          `http://localhost:5000/api/games/${res.data.game_id}/package`
        );

        const filteredRelated = relatedRes.data.filter(
          (p) => p.id !== parseInt(package_id)
        );
        setRelated(filteredRelated);
      } catch (err) {
        console.error("Error fetching package:", err);
      }
    };
    fetchPackage();
  }, [group_id, package_id]);

  if (!pkg) {
    return (
      <p
        className="mt-20 text-center"
        style={{ fontFamily: "'Cairo', sans-serif", color: "#fff" }}
      >
        Loading...
      </p>
    );
  }

  const fontFamily = "'Cairo', sans-serif";
  const goldColor = "#FFD700";

  const handleAddToCart = async () => {
  if (!user) {
    Swal.fire({
      icon: "info",
      title: "You must log in first",
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      background: "#222",
      color: "#fff",
    });
    return;
  }

  try {
    const existingItem = cartItems.find((item) => item.package_id === pkg.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      console.log(`Updating quantity to ${newQuantity}`);
      await updateQuantity(pkg.id, newQuantity);
    } else {
      console.log(`Adding new item to cart`);
      await addToCart(pkg);

      if (quantity > 1) {
        console.log(`Correcting quantity to ${quantity}`);
        await updateQuantity(pkg.id, quantity);
      }
    }

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `Package has been added to your cart.`,
      confirmButtonColor: "#FFD700",
      background: "#1E1E1E",
      color: "#fff",
    });
  } catch (err) {
    console.error("❌ Full error object:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to add the item to the cart.",
      background: "#1E1E1E",
      color: "#fff",
    });
  }
};


  return (
    <div
      className="min-h-screen px-4 py-8 md:px-10 mt-28"
      style={{ backgroundColor: "#0b0c1a", color: "white", fontFamily }}
    >
      <div className="flex flex-col items-center justify-center gap-10 mx-auto lg:flex-row lg:items-start max-w-7xl">
        {/* Image */}
        <div className="w-full max-w-sm">
          <img
            src={pkg.image_url}
            alt="Package"
            className="w-full rounded shadow-lg"
          />
        </div>

        {/* Info Box */}
        <div
          className="w-full max-w-xl p-6 rounded-md"
          style={{ backgroundColor: "#121321", border: `1px solid ${goldColor}` }}
        >
          <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            {pkg.amount} {pkg.currency}
          </h2>

          <p className="mb-4 text-xl font-semibold" style={{ color: goldColor }}>
            EGP {pkg.price_egp}
          </p>

          <ul className="pl-5 mb-4 space-y-1 text-sm text-green-400 list-disc">
            <li>{pkg.description_of_package}</li>
            <li>Region: Egypt</li>
            <li>
              <span className="text-white">No Refunds or exchange!</span> Check your{" "}
              <span className="font-semibold text-green-500">RIOT ID</span>
            </li>
            <li>VP arrives in 5 min (up to few hours)</li>
            <li>Don't order after midnight</li>
          </ul>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center mb-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2 py-1 mr-4 rounded border border-gray-600 bg-[#1a1b2f] text-white"
            />
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 font-bold rounded transition duration-200 ${
                user
                  ? "text-black hover:opacity-90"
                  : "bg-gray-600 text-white"
              }`}
              style={{
                backgroundColor: user ? goldColor : "#555",
                fontFamily,
                cursor: user ? "pointer" : "not-allowed",
              }}
            >
              Add to cart
            </button>
          </div>

          {/* <button
            onClick={() => addToWishlist(pkg.id)}
            className="text-sm underline transition hover:text-yellow-400"
            style={{ color: "#ccc" }}
          >
            ♥ Add to wishlist
          </button> */}
        </div>
      </div>

      {/* Related Section */}
      {related.length > 0 && (
        <div className="px-4 mx-auto mt-20 max-w-7xl">
          <h3
            className="mb-6 text-2xl font-bold"
            style={{ fontFamily, color: "#fff" }}
          >
            More from this Game
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <FlipCard key={r.id} pkg={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
