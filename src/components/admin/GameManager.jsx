import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const GameManager = () => {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    image_url: "",
    base_name: "",
    group_id: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/games");
      setGames(res.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (game) => {
    setForm(game);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.id) {
        await axios.put(`http://localhost:5000/api/games/${form.id}`, form);
        Swal.fire("Updated!", "Game updated successfully", "success");
      } else {
        await axios.post("http://localhost:5000/api/games", form);
        Swal.fire("Success", "Game added!", "success");
      }
      setForm({ id: null, name: "", image_url: "", base_name: "", group_id: "" });
      fetchGames();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed to submit game", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the game permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`);
      Swal.fire("Deleted!", "Game removed.", "success");
      fetchGames();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete game", "error");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold text-gold">Manage Games</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mb-10 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Game Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
        />
        <input
          type="text"
          name="base_name"
          placeholder="Base Name"
          value={form.base_name}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
        />
        <input
          type="number"
          name="group_id"
          placeholder="Group ID"
          value={form.group_id}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-semibold text-black rounded-md bg-gold hover:shadow-lg"
        >
          {loading ? (form.id ? "Updating..." : "Adding...") : form.id ? "Update Game" : "Add Game"}
        </button>
      </form>

      <table className="w-full text-left border border-white/20">
        <thead className="text-sm text-white uppercase bg-white/10">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Base</th>
            <th className="p-2">Group</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="border-t border-white/10">
              <td className="p-2">{game.id}</td>
              <td className="p-2">{game.name}</td>
              <td className="p-2">{game.base_name}</td>
              <td className="p-2">{game.group_id}</td>
              <td className="p-2">
                <img src={game.image_url} alt="img" className="w-16 rounded-md" />
              </td>
              <td className="flex gap-2 p-2">
                <button
                  onClick={() => handleEdit(game)}
                  className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameManager;