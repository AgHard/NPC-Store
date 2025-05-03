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
    <div className="flex items-center justify-center min-h-screen bg-[#151f28] font-[Poppins]">
      <div className="relative w-[400px] h-[200px] hover:w-[450px] hover:h-[500px] transition-all duration-500 ease-in-out group">
        <div className="absolute inset-0 animate-spin-slow rounded-[20px] bg-[repeating-conic-gradient(from_var(--angle),_#ff2770_0%,_#ff2770_5%,_transparent_5%,_transparent_40%,_#ff2770_50%)] shadow-[0_0_20px_#ff2770]"></div>
        <div className="absolute inset-0 animate-spin-slow delay-[-1s] rounded-[20px] bg-[repeating-conic-gradient(from_var(--angle),_#45f3ff_0%,_#45f3ff_5%,_transparent_5%,_transparent_40%,_#45f3ff_50%)] shadow-[0_0_20px_#45f3ff]"></div>
        <div className="absolute inset-[4px] bg-[#2d2d39] rounded-[15px] border-[8px] border-[#25252b] overflow-hidden">
          <div className="absolute inset-[60px] group-hover:inset-[40px] bg-black/30 backdrop-blur-md rounded-lg border-b border-white/50 shadow-inner text-white flex flex-col items-center justify-center transition-all duration-500">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-full gap-6 px-6 transform translate-y-[126px] group-hover:translate-y-0 transition-all duration-500"
            >
              <h2 className="text-xl font-bold tracking-widest text-white uppercase">
                <i className="fa-solid fa-right-to-bracket text-[#ff2770] drop-shadow-glow mr-1"></i>
                Login
                <i className="fa-solid fa-heart text-[#ff2770] drop-shadow-glow ml-1"></i>
              </h2>
              <div className="relative w-[300px]">
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-white placeholder-transparent bg-transparent border-0 border-b-2 peer focus:outline-none focus:border-white"
                />
                <span className="absolute left-0 top-3 text-gray-400 text-sm peer-focus:top-[-18px] peer-focus:text-white peer-valid:top-[-18px] peer-valid:text-white transition-all duration-300">
                  Email
                </span>
                <i className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded transition-all duration-500 peer-focus:h-11 peer-valid:h-11 z-[-1]"></i>
              </div>
              <div className="relative w-[300px]">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-white placeholder-transparent bg-transparent border-0 border-b-2 peer focus:outline-none focus:border-white"
                />
                <span className="absolute left-0 top-3 text-gray-400 text-sm peer-focus:top-[-18px] peer-focus:text-white peer-valid:top-[-18px] peer-valid:text-white transition-all duration-300">
                  Password
                </span>
                <i className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded transition-all duration-500 peer-focus:h-11 peer-valid:h-11 z-[-1]"></i>
              </div>
              <input
                type="submit"
                value={loading ? "Logging in..." : "Sign in"}
                disabled={loading}
                className="w-[280px] py-2 rounded-full bg-[#45f3ff] text-black font-bold cursor-pointer hover:shadow-[0_0_10px_#45f3ff,0_0_60px_#45f3ff] transition-all"
              />
              <div className="flex justify-between w-full mt-2 text-sm text-white/80">
                <a href="#" className="hover:underline">
                  Forgot Password
                </a>
                <Link
                  to="/signup"
                  className="font-semibold text-pink-500 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
