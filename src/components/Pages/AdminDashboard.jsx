import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaStar,
  FaCommentDots,
  FaEnvelope,
  FaSignOutAlt,
  FaFire,
} from "react-icons/fa";
import { fetchProfile, logout } from "../../redux/slices/authSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admindashboard" },
    { name: "Products", icon: <FaBox />, path: "/admindashboard/products" },
    { name: "Bestsellers", icon: <FaFire />, path: "/admindashboard/bestsellers" },
    { name: "Reviews", icon: <FaStar />, path: "/admindashboard/reviews" },
    { name: "Testimonials", icon: <FaCommentDots />, path: "/admindashboard/testimonials" },
    { name: "Contact Us", icon: <FaEnvelope />, path: "/admindashboard/contact" },
  ];

  useEffect(() => {
    if (token) dispatch(fetchProfile(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
    useEffect(() => {
      document.title = "SketchWebsite - AdminDashBoard";
    }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Top Section: Logo + Links */}
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
            {sidebarOpen && (
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#d4a373] to-[#b9855c]">
                SketchLogo
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 focus:outline-none text-lg font-bold"
            >
              {sidebarOpen ? "«" : "»"}
            </button>
          </div>

          {/* Sidebar Links */}
      {/* Sidebar Links */}
<nav className="mt-4 flex flex-col gap-1 px-1">
  {sidebarLinks.map((link, index) => (
    <NavLink
      key={index}
      to={link.path}
      end={link.path === "/admindashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white font-semibold"
            : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-[#d4a373] hover:to-[#b9855c]"
        }`
      }
      style={({ isActive }) => ({
        textDecoration: "none", 
      })}
    >
      <span className="text-lg">{link.icon}</span>
      {sidebarOpen && <span>{link.name}</span>}
    </NavLink>
  ))}
</nav>

        </div>

        {/* Bottom Section: Logout */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-white bg-gradient-to-r from-[#d4a373] to-[#b9855c] transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-white shadow-sm border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d4a373] to-[#b9855c]">
              {user?.username || "Admin"}
            </span>
          </h1>
        </header>

        {/* Page content */}
        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
