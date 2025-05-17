import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 eye icons

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev); // 👈 toggle handler

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
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gradient-to-br from-black via-gray-900 to-black">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 border shadow-2xl rounded-3xl border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="mb-6 text-4xl font-extrabold text-center text-gold drop-shadow-[0_0_5px_gold]">
          Login
        </h2>

        <motion.input
          whileFocus={{ scale: 1.03, boxShadow: "0 0 10px #FFD700" }}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-5 text-white transition-all duration-300 bg-transparent border rounded-xl border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:shadow-gold"
          required
        />

        <div className="relative mb-8">
          <motion.input
            whileFocus={{ scale: 1.03, boxShadow: "0 0 10px #FFD700" }}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 pr-10 text-white transition-all duration-300 bg-transparent border rounded-xl border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:shadow-gold"
            required
          />
          <span
            className="absolute cursor-pointer right-3 top-4 text-white/70 hover:text-gold"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #FFD700" }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl font-bold text-black text-lg tracking-wide transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gold hover:shadow-[0_0_10px_#FFD700]"
          }`}
        >
          {loading ? "Logging in..." : "🚀 Login"}
        </motion.button>

        <p className="mt-5 text-sm text-center text-white/70">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
