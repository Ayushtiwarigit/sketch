import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
  clearTestimonialsState,
} from "../../redux/slices/testimonialsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTestimonials = () => {
  const dispatch = useDispatch();
  const { items, status, error, success } = useSelector(
    (state) => state.testimonials
  );

  const [formData, setFormData] = useState({
    name: "",
    screenshot: null,
  });

  const [deleteId, setDeleteId] = useState(null); // ✅ Track which testimonial is pending delete

  // Fetch testimonials on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
    return () => dispatch(clearTestimonialsState());
  }, [dispatch]);

  // Show toast messages
  useEffect(() => {
    if (error) toast.error(error);
    if (success) toast.success("Action successful");
  }, [error, success]);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // ✅ ensure this matches your storage key
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("screenshot", formData.screenshot);

    await dispatch(createTestimonial({ formData: fd, token }));
    setFormData({ name: "", screenshot: null });
  };

  // Confirm delete
  const confirmDelete = async (id) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteTestimonial({ id, token }));
    toast.success("Testimonial deleted successfully");
    setDeleteId(null);
  };
    useEffect(() => {
        document.title = "SketchWebsite - AdminTestimonials";
      }, []);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>

      {/* Add Testimonial Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-6 items-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border px-3 py-2 rounded flex-1"
          required
        />
        <input
          type="file"
          name="screenshot"
          onChange={handleInputChange}
          accept="image/*"
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded"
        >
          {status === "loading" ? "Uploading..." : "Add Testimonial"}
        </button>
      </form>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No testimonials found.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="border rounded p-4 flex flex-col items-center shadow hover:shadow-lg transition"
            >
              {item.screenshot && (
                <img
                  src={item.screenshot}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-2">ID: {item._id}</p>

              {/* Delete Section */}
              {deleteId === item._id ? (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => confirmDelete(item._id)}
                    className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-3 py-1 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteId(item._id)}
                  className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-3 py-1 rounded hover:opacity-90 transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
