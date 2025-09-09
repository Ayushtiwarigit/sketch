// src/pages/admin/AdminBestsellers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestsellers,
  createBestseller,
  fetchBestsellerById,
  clearBestsellersState,
} from "../../redux/slices/bestsellersSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBestsellers = () => {
  const dispatch = useDispatch();
  const { items, bestseller, loading, error, success, message } = useSelector(
    (state) => state.bestsellers
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
    videos: null,
  });

  // ✅ Fetch bestsellers on mount
  useEffect(() => {
    dispatch(fetchBestsellers());
    return () => {
      dispatch(clearBestsellersState());
    };
  }, [dispatch]);

  // ✅ Show toast messages
  useEffect(() => {
    if (error) toast.error(error);
    if (success && message) toast.success(message);
  }, [error, success, message]);

  // ✅ Handle form input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files.length === 1 ? files[0] : files,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit form
  // ✅ Submit form
const handleSubmit = async (e) => {
  e.preventDefault(); // stop page reload

  const fd = new FormData();
  fd.append("name", formData.name);
  fd.append("bio", formData.bio);

  if (formData.image) fd.append("image", formData.image);

  if (formData.videos) {
    if (formData.videos.length) {
      for (let i = 0; i < formData.videos.length; i++) {
        fd.append("videos", formData.videos[i]);
      }
    } else {
      fd.append("videos", formData.videos);
    }
  }

  const resultAction = await dispatch(createBestseller({ formData: fd }));

  if (createBestseller.fulfilled.match(resultAction)) {
    setShowModal(false);
    setFormData({ name: "", bio: "", image: null, videos: null });
  }
};


  // ✅ Handle view action
  const handleView = (id) => {
    dispatch(fetchBestsellerById(id));
    setShowModal(true);
  };
 useEffect(() => {
        document.title = "SketchWebsite - AdminBestsellers";
      }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setFormData({ name: "", bio: "", image: null, videos: null }); // reset form
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded"
        >
          + Add Bestseller
        </button>
      </div>

      {/* Bestsellers List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Bio</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No bestsellers found.
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item._id}>
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.bio}</td>
                  <td className="p-2 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleView(item._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">
              {bestseller ? "View Bestseller" : "Add Bestseller"}
            </h2>

            {bestseller ? (
              <div>
                <p>
                  <strong>Name:</strong> {bestseller.name}
                </p>
                <p>
                  <strong>Bio:</strong> {bestseller.bio}
                </p>
                <img
                  src={bestseller.image}
                  alt={bestseller.name}
                  className="w-64 h-64 object-cover rounded mt-2"
                />
                {bestseller.videos && bestseller.videos.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {bestseller.videos.map((v, idx) => (
                      <video
                        key={idx}
                        src={v}
                        controls
                        className="w-full rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
             <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleInputChange}
    className="border px-3 py-2 rounded"
    required
  />
  <textarea
    name="bio"
    placeholder="Bio"
    value={formData.bio}
    onChange={handleInputChange}
    className="border px-3 py-2 rounded"
    required
  />
  <input
    type="file"
    name="image"
    onChange={handleInputChange}
    className="border px-3 py-2 rounded"
    accept="image/*"
    required
  />
  <input
    type="file"
    name="videos"
    onChange={handleInputChange}
    className="border px-3 py-2 rounded"
    accept="video/*"
    multiple
  />
  <button
    type="submit"
    className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded"
  >
    Create
  </button>
</form>

            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBestsellers;
