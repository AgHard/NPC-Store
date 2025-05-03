import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext"; // adjust if needed

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      login(res.data.user, res.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${res.data.user.username}!`,
        confirmButtonColor: "#FFD700",
      });

      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 border shadow-lg bg-black/30 border-white/10 rounded-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-gold">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 text-white bg-transparent border rounded border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 text-white bg-transparent border rounded border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-bold text-black transition-colors duration-200 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gold"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-white/80">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
