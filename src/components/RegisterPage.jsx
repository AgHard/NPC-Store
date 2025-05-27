import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false); // For animation
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure both password fields are the same.',
      });
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // Swal.fire({
      //   icon: 'success',
      //   title: 'Registered Successfully!',
      //   text: `Welcome, ${res.data.user.username}!`,
      //   confirmButtonColor: '#FFD700',
      //   timer: 1800,
      //   showConfirmButton: false,
      // });

      setSubmitted(true); // trigger animation

      setTimeout(() => {
        navigate('/login');
      }, 1800); // match SweetAlert timer
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gradient-to-br from-black via-gray-900 to-black">
      <AnimatePresence>
        {!submitted && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md p-8 border shadow-2xl rounded-3xl border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl"
          >
            <h2 className="mb-6 text-4xl font-extrabold text-center text-gold">
              Sign Up
            </h2>

            <motion.input
              whileFocus={{ scale: 1.03, boxShadow: '0 0 10px #FFD700' }}
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 mb-5 text-white transition-all duration-300 bg-transparent border rounded-xl border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:shadow-gold"
              required
            />

            <motion.input
              whileFocus={{ scale: 1.03, boxShadow: '0 0 10px #FFD700' }}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-5 text-white transition-all duration-300 bg-transparent border rounded-xl border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:shadow-gold"
              required
            />

            {/* Password */}
            <div className="relative mb-5">
              <motion.input
                whileFocus={{ scale: 1.03, boxShadow: '0 0 10px #FFD700' }}
                type={showPassword ? 'text' : 'password'}
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

            {/* Confirm Password */}
            <div className="relative mb-8">
              <motion.input
                whileFocus={{ scale: 1.03, boxShadow: '0 0 10px #FFD700' }}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 pr-10 text-white transition-all duration-300 bg-transparent border rounded-xl border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:shadow-gold"
                required
              />
              <span
                className="absolute cursor-pointer right-3 top-4 text-white/70 hover:text-gold"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px #FFD700' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 font-bold text-black text-lg tracking-wide transition-all duration-300 rounded-xl bg-gold hover:shadow-[0_0_10px_#FFD700]"
            >
              🚀 Sign Up
            </motion.button>

            <p className="mt-5 text-sm text-center text-white/70">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:underline">
                Sign In
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
