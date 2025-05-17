import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useCollections } from "../../context/CollectionContext";

const CollectionManager = () => {
  const { user } = useContext(AuthContext);
  const { collections, fetchCollections } = useCollections();
  const formRef = useRef(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    collection_id: "",
    image_url: "",
    group_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) {
        await axios.put(`http://localhost:5000/api/collections/${form.id}`, form);
        Swal.fire("Updated!", "Collection updated!", "success");
      } else {
        await axios.post("http://localhost:5000/api/collections", form);
        Swal.fire("Success", "Collection added!", "success");
      }
      setForm({
        id: null,
        name: "",
        description: "",
        collection_id: "",
        image_url: "",
        group_id: "",
      });
      fetchCollections();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || "Failed to submit collection", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (col) => {
    setForm(col);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the collection permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/collections/${id}`);
      Swal.fire("Deleted!", "Collection removed.", "success");
      fetchCollections();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete collection", "error");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold text-gold">Manage Collections</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mb-10 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Collection Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
        />
        <input
          type="text"
          name="collection_id"
          placeholder="Collection ID"
          value={form.collection_id}
          onChange={handleChange}
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
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
          {form.id ? "Update Collection" : loading ? "Adding..." : "Add Collection"}
        </button>
      </form>

      <table className="w-full text-left border border-white/20">
        <thead className="text-sm text-white uppercase bg-white/10">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Group ID</th>
            <th className="p-2">Collection ID</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col) => (
            <tr key={col.id} className="border-t border-white/10">
              <td className="p-2">{col.id}</td>
              <td className="p-2">{col.name}</td>
              <td className="p-2">{col.description}</td>
              <td className="p-2">{col.group_id}</td>
              <td className="p-2">{col.collection_id}</td>
              <td className="p-2">
                <img src={col.image_url} alt="img" className="w-16 rounded-md" />
              </td>
              <td className="flex gap-2 p-2">
                <button
                  onClick={() => handleEdit(col)}
                  className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(col.id)}
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

export default CollectionManager;
