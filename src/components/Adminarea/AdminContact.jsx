// src/pages/admin/AdminContact.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, clearContactState } from "../../redux/slices/contactSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages, loading, error } = useSelector((state) => state.contact);

  // ✅ Check for admin token
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in as admin to view this page");
      navigate("/admin/login"); // Redirect to admin login if no token
      return;
    }

    dispatch(fetchContacts({ token })); // Optional: Pass token if your API needs auth
    return () => dispatch(clearContactState());
  }, [dispatch, token, navigate]);

  // Show toast for errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
 useEffect(() => {
        document.title = "SketchWebsite - AdminContact";
      }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-4 rounded shadow hover:shadow-lg transition bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white flex flex-col gap-2"
            >
              <h3 className="font-semibold text-lg">{msg.name}</h3>
              <p className="text-sm">{msg.email}</p>
              <p className="mt-2 bg-white text-gray-800 p-2 rounded">{msg.message}</p>
              <p className="text-xs mt-2">ID: {msg._id}</p>
              <p className="text-xs">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContact;
