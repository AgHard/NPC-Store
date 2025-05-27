import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAnnouncement } from "../../context/AnnouncementContext"; // update path if needed

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ id: null, message: "", is_active: false });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { fetchActiveAnnouncement } = useAnnouncement(); // context fetcher

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.id) {
        await axios.put(`http://localhost:5000/api/announcements/${form.id}`, form);
        Swal.fire("Updated", "Announcement updated", "success");
      } else {
        await axios.post("http://localhost:5000/api/announcements", form);
        Swal.fire("Created", "New announcement added", "success");
      }
      setForm({ id: null, message: "", is_active: false });
      await fetchAnnouncements();
      await fetchActiveAnnouncement(); // refresh banner
    } catch (err) {
      Swal.fire("Error", "Operation failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setForm(announcement);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      Swal.fire("Deleted", "Announcement removed", "success");
      await fetchAnnouncements();
      await fetchActiveAnnouncement(); // refresh banner
    } catch (err) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  return (
    <div className="p-6 pt-24 text-white">
      <h1 className="mb-6 text-3xl font-bold text-gold">Manage Announcements</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl mb-10 space-y-4">
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Announcement message"
          className="w-full p-2 text-white bg-black border rounded-md border-gold"
          required
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Active (show on banner)
        </label>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-semibold text-black rounded-md bg-gold"
        >
          {form.id ? "Update" : "Create"}
        </button>
      </form>

      <table className="w-full text-left border border-white/20">
        <thead className="text-sm text-white uppercase bg-white/10">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Message</th>
            <th className="p-2">Active</th>
            <th className="p-2">Created</th>
            <th className="p-2">Updated</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((a) => (
            <tr key={a.id} className="border-t border-white/10">
              <td className="p-2">{a.id}</td>
              <td className="p-2">{a.message}</td>
              <td className="p-2">{a.is_active ? "Yes" : "No"}</td>
              <td className="p-2">{new Date(a.created_at).toLocaleString()}</td>
              <td className="p-2">{new Date(a.updated_at).toLocaleString()}</td>
              <td className="flex gap-2 p-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="px-3 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
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

export default AnnouncementManager;
