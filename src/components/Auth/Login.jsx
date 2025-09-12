import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../../redux/slices/authSlice.js";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Install react-icons if you haven't

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, token, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (email && password) {
      dispatch(loginUser({ email, password }));
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  useEffect(() => {
    if (message && token && user) {
      toast.success(message);
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      }, 1500);
      dispatch(clearAuthState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthState());
    }
  }, [message, error, token, user, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d4a373] to-[#b9855c]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div
          className="text-[#b9855c] font-bold text-2xl cursor-pointer mb-4 text-center font-greatvibes"
          onClick={() => {
            if (token) {
              navigate("/home");
            } else {
              navigate("/signup");
            }
          }}
        >
         ShejalArt
        </div>

        <h2 className="text-2xl font-bold text-[#b9855c] mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded text-gray-700 focus:ring-2 focus:ring-[#b9855c]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded w-full text-gray-700 focus:ring-2 focus:ring-[#b9855c]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#b9855c] font-medium hover:opacity-80 transition-colors"
          >
            Signup
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
