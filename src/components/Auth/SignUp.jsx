import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "../../redux/slices/authSlice.js";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // install react-icons if not installed

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, role } = form;
    if (name && email && password && role) {
      dispatch(registerUser({ username: name, email, password, role }));
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      setTimeout(() => navigate("/login"), 1500); // redirect after success
      dispatch(clearAuthState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearAuthState());
    }
  }, [message, error, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#d4a373] to-[#b9855c]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div
          className="text-[#b9855c] font-bold text-2xl cursor-pointer mb-4 text-center font-greatvibes"
          onClick={() => {
            if (token) {
              navigate("/"); 
            } else {
              navigate("/signup"); 
            }
          }}
        >
          ShejalArt
        </div>

        <h2 className="text-2xl font-bold text-[#b9855c] mb-6 text-center">Signup</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded text-gray-700 focus:ring-2 focus:ring-[#b9855c]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded text-gray-700 focus:ring-2 focus:ring-[#b9855c]"
          />

          {/* Password with eye toggle */}
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

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded text-gray-700 focus:ring-2 focus:ring-[#b9855c]"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#b9855c] font-medium">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
