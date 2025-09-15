import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBestsellers,
  createBestseller,
  updateBestseller,
  deleteBestseller,
  fetchBestsellerById,
  clearBestsellersState,
} from "../../redux/slices/bestsellersSlice.js";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AdminBestsellers = () => {
  const dispatch = useDispatch();
  const { items, bestseller, loading, error, success, message } = useSelector(
    (state) => state.bestsellers
  );

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
    videos: null,
  });
  const [editId, setEditId] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Fetch bestsellers on mount
  useEffect(() => {
    dispatch(fetchBestsellers());
    return () => {
      dispatch(clearBestsellersState());
    };
  }, [dispatch]);

  // ✅ Show only one toast
  useEffect(() => {
    toast.dismiss(); // close any previous toasts
    if (error) toast.error(error, { toastId: "mainToast" });
    if (success && message) toast.success(message, { toastId: "mainToast" });
  }, [error, success, message]);

  useEffect(() => {
    document.title = "SketchWebsite - AdminBestsellers";
  }, []);

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

  // ✅ Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    let resultAction;
    if (isEditing && editId) {
      resultAction = await dispatch(updateBestseller({ id: editId, formData: fd }));
    } else {
      resultAction = await dispatch(createBestseller(fd));
    }

    if (
      createBestseller.fulfilled.match(resultAction) ||
      updateBestseller.fulfilled.match(resultAction)
    ) {
      setShowModal(false);
      setFormData({ name: "", bio: "", image: null, videos: null });
      setIsEditing(false);
      setEditId(null);
    }
  };

  // ✅ Handle view action
  const handleView = (id) => {
    dispatch(fetchBestsellerById(id));
    setShowModal(true);
    setIsEditing(false);
  };

  // ✅ Handle edit action
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      name: item.name,
      bio: item.bio,
      image: null,
      videos: null,
    });
    setShowModal(true);
  };

  // ✅ Open delete modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  // ✅ Confirm delete
  const confirmDelete = async () => {
    setDeleteModal(false);
    if (!deleteId) return;

    const result = await dispatch(deleteBestseller(deleteId));

    if (deleteBestseller.fulfilled.match(result)) {
      toast.success(result.payload?.message || "Deleted successfully", {
        toastId: "mainToast",
      });
    } else {
      const errMsg = result.payload || result.error?.message || "Failed to delete";
      toast.error(errMsg, { toastId: "mainToast" });
    }

    setDeleteId(null);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <ToastContainer position="top-right" />

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-3 rounded shadow">Please wait...</div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setFormData({ name: "", bio: "", image: null, videos: null });
            setIsEditing(false);
            setEditId(null);
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
            {items.length === 0 ? (
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
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleView(item._id)}
                        className="text-blue-500"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-green-500"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="text-red-500"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this bestseller?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit/View Modal */}
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
              {isEditing
                ? "Edit Bestseller"
                : bestseller
                ? "View Bestseller"
                : "Add Bestseller"}
            </h2>

            {bestseller && !isEditing ? (
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
                  {isEditing ? "Update" : "Create"}
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
