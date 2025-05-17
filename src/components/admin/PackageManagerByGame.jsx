import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PackageManagerByGame = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [packages, setPackages] = useState([]);
  const [bulkPercent, setBulkPercent] = useState("");
  const formRef = useRef(null);
  const [form, setForm] = useState({
    id: null,
    amount: "",
    currency: "",
    price_egp: "",
    description_of_package: "",
    group_id: "",
    image_url: "",
  });

  const fetchGames = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/games");
      setGames(res.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  const fetchPackages = async (game_id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/games/${game_id}/package`
      );
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (selectedGameId) {
      fetchPackages(selectedGameId);
    }
  }, [selectedGameId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`http://localhost:5000/api/packages/${form.id}`, form);
        Swal.fire("Updated!", "Package updated successfully", "success");
      } else {
        await axios.post("http://localhost:5000/api/packages", {
          ...form,
          game_id: selectedGameId,
        });
        Swal.fire("Success", "Package added!", "success");
      }

      setForm({
        id: null,
        amount: "",
        currency: "",
        price_egp: "",
        description_of_package: "",
        group_id: "",
        image_url: "",
      });
      fetchPackages(selectedGameId);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to submit package",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the package permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`);
      Swal.fire("Deleted!", "Package removed.", "success");
      fetchPackages(selectedGameId);
    } catch (err) {
      Swal.fire("Error", "Failed to delete package", "error");
    }
  };

  const handleBulkUpdate = async () => {
    const percent = parseFloat(bulkPercent);
    if (isNaN(percent) || percent <= 0) {
      return Swal.fire("Error", "Enter a valid percentage", "error");
    }

    try {
      await Promise.all(
        packages.map((pkg) =>
          axios.put(`http://localhost:5000/api/packages/${pkg.id}`, {
            ...pkg,
            price_egp: (pkg.price_egp * (1 + percent / 100)).toFixed(2),
          })
        )
      );
      Swal.fire("Updated", "All prices updated", "success");
      fetchPackages(selectedGameId);
    } catch (err) {
      Swal.fire("Error", "Failed to update prices", "error");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold text-gold">
        Manage Packages by Game
      </h1>

      <div className="mb-6">
        <select
          className="w-full p-2 text-white bg-black border rounded border-gold"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
        >
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {selectedGameId && (
        <>
          <form ref={formRef} onSubmit={handleAdd} className="max-w-xl mb-10 space-y-4">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
              required
            />
            <input
              type="text"
              name="currency"
              placeholder="Currency (e.g. USD)"
              value={form.currency}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
              required
            />
            <input
              type="number"
              name="price_egp"
              placeholder="Price in EGP"
              value={form.price_egp}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
              required
            />
            <input
              type="text"
              name="description_of_package"
              placeholder="Package Description"
              value={form.description_of_package}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
            />
            <input
              type="text"
              name="group_id"
              placeholder="Group ID"
              value={form.group_id}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-2 text-white bg-black border rounded border-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-black rounded bg-gold hover:shadow-lg"
            >
              {form.id ? "Update Package" : "Add Package"}
            </button>
          </form>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Increase price by %"
              onChange={(e) => setBulkPercent(e.target.value)}
              className="p-2 text-black rounded"
            />
            <button
              onClick={handleBulkUpdate}
              className="px-4 py-2 text-black bg-green-400 rounded hover:bg-green-500"
            >
              Update All Prices
            </button>
          </div>

          <table className="w-full text-left border border-white/20">
            <thead className="text-sm text-white uppercase bg-white/10">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Currency</th>
                <th className="p-2">Price</th>
                <th className="p-2">Description</th>
                <th className="p-2">Group ID</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-t border-white/10">
                  <td className="p-2">{pkg.id}</td>
                  <td className="p-2">{pkg.amount}</td>
                  <td className="p-2">{pkg.currency}</td>
                  <td className="p-2">{pkg.price_egp}</td>
                  <td className="p-2">{pkg.description_of_package || "-"}</td>
                  <td className="p-2">{pkg.group_id || "-"}</td>
                  <td className="flex gap-2 p-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PackageManagerByGame;