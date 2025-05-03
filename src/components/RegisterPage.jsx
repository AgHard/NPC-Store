import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);

      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully!',
        text: `Welcome, ${res.data.user.username}!`,
        confirmButtonColor: '#FFD700', // gold color
      });

      navigate('/login');
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
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-black/30">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 border shadow-lg bg-black/30 border-white/10 rounded-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-gold">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 text-white bg-transparent border rounded border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
          required
        />
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
          className="w-full py-2 font-bold text-black transition-colors duration-200 bg-white rounded hover:bg-gold"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-white/80">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
