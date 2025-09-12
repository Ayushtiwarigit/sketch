
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { fetchWishlist } from "../../redux/slices/wishlistSlice.js";
import { getCart } from "../../redux/slices/cartSlice.js";

export default function Header() {
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const learnRef = useRef(null);
  const accountRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.items);
  const { items: cartItems } = useSelector((state) => state.cart);

  // Fetch wishlist + cart if logged in
  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist(token));
      dispatch(getCart(token)); // ✅ fetch cart for header badge
    }
  }, [dispatch, token]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (learnRef.current && !learnRef.current.contains(event.target)) {
        setIsLearnDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const themeBg = "bg-gradient-to-r from-[#d4a373] to-[#b9855c]";
  const linkClass = "text-white hover:opacity-80 text-decoration-none";

  return (
    <header className={`w-full shadow-md ${themeBg}`}>
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
        {/* Logo */}
      <div
  className="text-white text-4xl cursor-pointer font-greatvibes"
  onClick={() => navigate(token ? "/home" : "/signup")}
>
  ShejalArt
</div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/products" className={linkClass}>Products</a>
          <a href="/bestseller" className={linkClass}>Bestseller</a>
          <a href="/our-story" className={linkClass}>Our Story</a>
          <a href="/contact" className={linkClass}>Contact</a>
          <a href="/about" className={linkClass}>About Us</a>

          {/* Learn Art Dropdown */}
          {/* <div ref={learnRef} className="relative">
            <button
              onClick={() => setIsLearnDropdownOpen(!isLearnDropdownOpen)}
              className={`flex items-center gap-1 ${linkClass} focus:outline-none`}
            >
              Learn Art
            </button>
            {isLearnDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 rounded shadow-lg z-50 bg-gradient-to-r from-[#d4a373] to-[#b9855c]">
                <a href="/learn/drawing" className={`${linkClass} block px-4 py-2`}>Drawing</a>
                <a href="/learn/painting" className={`${linkClass} block px-4 py-2`}>Painting</a>
                <a href="/learn/sculpture" className={`${linkClass} block px-4 py-2`}>Sculpture</a>
              </div>
            )}
          </div> */}
        </nav>

        {/* Icons + Mobile Menu Button */}
        <div className="flex items-center gap-4 text-white text-xl">
          {/* Wishlist */}
          <div
            className="relative cursor-pointer hover:opacity-80"
            onClick={() => navigate("/wishlist")}
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#b9855c] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer hover:opacity-80"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#b9855c] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Account Dropdown */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className={`p-2 ${linkClass} focus:outline-none`}
            >
              <FaUser />
            </button>
            {isAccountDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 ${themeBg} text-white rounded shadow-lg z-50`}>
                {token && user ? (
                  <div className="px-4 py-2 flex flex-col gap-1">
                    <span className="font-semibold">{user.username}</span>
                    <span className="text-sm">{user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="mt-2 bg-white text-[#b9855c] hover:bg-gray-200 py-1 rounded font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <a href="/login" className={linkClass}>Login</a>
                    <a href="/signup" className={linkClass}>Sign Up</a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1 text-white">
          <a href="/products" className={linkClass}>Products</a>
          <a href="/bestseller" className={linkClass}>Bestseller</a>
          <a href="/our-story" className={linkClass}>Our Story</a>
          <a href="/contact" className={linkClass}>Contact</a>
          <a href="/about" className={linkClass}>About Us</a>

          {/* Mobile Learn Art Dropdown */}
          <div className="mt-1">
            <span className="block py-2">Learn Art</span>
            <div className="ml-2 flex flex-col gap-1">
              <a href="/learn/drawing" className={linkClass}>Drawing</a>
              <a href="/learn/painting" className={linkClass}>Painting</a>
              <a href="/learn/sculpture" className={linkClass}>Sculpture</a>
            </div>
          </div>

          {/* Mobile Account */}
          <div className="mt-1">
            <span className="block py-2">Account</span>
            <div className="ml-2 flex flex-col gap-1">
              {token && user ? (
                <>
                  <span className="block">{user.username}</span>
                  <span className="block">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="mt-1 w-full bg-white text-[#b9855c] hover:bg-gray-200 py-1 rounded font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className={linkClass}>Login</a>
                  <a href="/signup" className={linkClass}>Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
