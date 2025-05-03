import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FlipCard from "./FlipCard";
import { WishlistContext } from "../context/WishlistContext";
import { useContext } from "react";

const PackageDetails = () => {
  const { group_id, package_id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToWishlist } = useContext(WishlistContext);

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
        console.log(res.data.game_id);

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
    return <p className="mt-20 text-center text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0b0c1a] text-white px-4 md:px-10 py-8 mt-28">
      <div className="flex flex-col items-center justify-center gap-10 mx-auto lg:flex-row lg:items-start max-w-7xl">
        <div className="w-full max-w-sm">
          <img
            src={pkg.image_url}
            alt="Package"
            className="w-full rounded shadow-lg"
          />
        </div>

        <div className="bg-[#121321] border border-green-700 p-6 rounded-md w-full max-w-xl">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            {pkg.amount} {pkg.currency}
          </h2>
          <p className="mb-4 text-xl font-semibold text-red-500">
            EGP {pkg.price_egp}
          </p>

          <ul className="pl-5 mb-4 space-y-1 text-sm text-green-400 list-disc">
            <li>{pkg.description_of_package}</li>
            <li>Region: Egypt</li>
            <li>
              <span className="text-white">No Refunds or exchange!</span> Check
              your <span className="font-semibold text-green-500">RIOT ID</span>
            </li>
            <li>VP arrives in 5 min (up to few hours)</li>
            <li>Don't order after midnight</li>
          </ul>

          <div className="flex items-center mb-4">
            <input
              type="number"
              defaultValue={1}
              className="w-16 px-2 py-1 rounded border border-gray-600 bg-[#1a1b2f] text-white mr-4"
            />
            <button className="px-6 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700">
              Add to cart
            </button>
          </div>

          <button
            onClick={() => addToWishlist(pkg.id)}
            className="text-sm text-gray-300 underline hover:text-white"
          >
            ♥ Add to wishlist
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="px-4 mx-auto mt-20 max-w-7xl">
          <h3 className="mb-6 text-2xl font-bold text-white">
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
