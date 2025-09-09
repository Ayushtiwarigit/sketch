import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home/Home";
import AdminLogin from "./components/Auth/Login";
import AdminSignup from "./components/Auth/SignUp";
import "./App.css";
import ProductDetails from "./components/Pages/ProductDetails";
import Signup from "./components/Auth/SignUp";
import ProductsPage from "./components/ProductsPage";
import BestSellersPage from "./components/BestSellersPage";
import WishlistPage from "./components/WishlistPage";
import About from "./components/Pages/About";
import CartPage from "./components/CartPage";
import ContactPage from "./components/ContactPage";
import OurStoryPage from "./components/Pages/OurStoryPage";

// Admin
import AdminDashboard from "./components/Pages/AdminDashboard";
import AdminProducts from "./components/Adminarea/AdminProducts";
import AdminBestsellers from "./components/Adminarea/AdminBestsellers";
import AdminReviews from "./components/Adminarea/AdminReviews";
import AdminContact from "./components/Adminarea/AdminContact";
import AdminTestimonials from "./components/Adminarea/AdminTestimonials";
import DashboardHome from "./components/Adminarea/DashboardHome";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/bestseller" element={<BestSellersPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/our-story" element={<OurStoryPage />} />

      {/* Admin Dashboard Protected */}
      <Route
        path="/admindashboard/*"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="bestsellers" element={<AdminBestsellers />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="contact" element={<AdminContact />} />
      </Route>

      {/* Add User Dashboard Protected (example) */}
      <Route
        path="/userdashboard/*"
        element={
          <ProtectedRoute roles={["user"]}>
            {/* Replace with your UserDashboard component */}
            <div>User Dashboard</div>
          </ProtectedRoute>
        }
      >
        <Route index element={<div>User Home</div>} />
        {/* Add user-specific pages */}
      </Route>
    </Routes>
  );
}

export default App;
