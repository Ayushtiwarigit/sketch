import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice.js";
import { toast } from "react-toastify";



const img_url="http://sketchapi.vercel.app"

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, product, loading, error, message } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    paperSize: "",
    width: "",
    height: "",
    faces: "",
    image: null,
    gallery: [],
    videos: [],
  });

  const [searchId, setSearchId] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all products initially
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Toast notifications
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setFormData({ ...formData, image: files[0] });
    else if (name === "gallery") setFormData({ ...formData, gallery: [...files] });
    else if (name === "videos") setFormData({ ...formData, videos: [...files] });
    else setFormData({ ...formData, [name]: value });
  };

  // Reset form
  const resetForm = () =>
    setFormData({
      title: "",
      price: "",
      paperSize: "",
      width: "",
      height: "",
      faces: "",
      image: null,
      gallery: [],
      videos: [],
    });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch token at the time of submission
    const adminToken = localStorage.getItem("token") || localStorage.getItem("admintoken");
    console.log("Admin token:", adminToken);
    if (!adminToken) {
      toast.error("Admin token missing!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("paperSize", formData.paperSize);
    data.append("size[width]", formData.width);
    data.append("size[height]", formData.height);
    data.append("faces", formData.faces);
    if (formData.image) data.append("image", formData.image);
    formData.gallery.forEach((file) => data.append("gallery", file));
    formData.videos.forEach((file) => data.append("videos", file));

    try {
      if (editId) {
        console.log("Updating product with ID:", editId);
        await dispatch(updateProduct({ id: editId, formData: data })).unwrap();
        toast.success("Product updated successfully!");
      } else {
        console.log("Creating new product");
        await dispatch(createProduct({ formData: data })).unwrap();
        toast.success("Product created successfully!");
      }
      resetForm();
      setShowModal(false);
      setEditId(null);
      dispatch(fetchProducts());
    } catch (err) {
      console.error("API Error:", err);
      toast.error(err || "Operation failed");
    }
  };

  const handleSearch = () => {
    if (searchId.trim() !== "") dispatch(fetchProductById(searchId));
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setFormData({
      title: prod.title,
      price: prod.price,
      paperSize: prod.paperSize,
      width: prod.size?.width || "",
      height: prod.size?.height || "",
      faces: prod.faces || "",
      image: null,
      gallery: [],
      videos: [],
    });
    setShowModal(true);
  };

  const handleDelete = (id) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      toast.success("Product deleted successfully!");
      dispatch(fetchProducts());
    } catch (err) {
      console.error("Delete API Error:", err);
      toast.error(err || "Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  };
 useEffect(() => {
        document.title = "SketchWebsite - AdminProducts";
      }, []);




    console.log("<><>>RRRRRRRRR",product,products)


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-transparent bg-clip-text">
          Manage Products
        </h2>
        <button
          onClick={() => {
            resetForm();
            setEditId(null);
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded hover:opacity-90"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded hover:opacity-90"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Search Result */}
      {product && (
        <div className="bg-white shadow rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600">Price: ${product.price}</p>
          <p className="text-gray-600">Product ID: {product._id}</p>
          {product.image && (
            <img
              src={product?.image}
              alt={product.title}
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}
        </div>
      )}

      {/* All Products */}
      <h3 className="text-xl font-semibold mb-4">All Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-gray-500">No products found</p>
        ) : (
          products.map((prod) => (
            <div key={prod._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h4 className="font-bold text-gray-800">{prod.title}</h4>
              <p className="text-gray-600">Price: ${prod.price}</p>
              <p className="text-gray-500 text-sm">ID: {prod._id}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="flex-1 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-1 rounded text-sm hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                resetForm();
                setShowModal(false);
                setEditId(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-transparent bg-clip-text">
              {editId ? "Update Product" : "Create Product"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="paperSize"
                placeholder="Paper Size"
                value={formData.paperSize}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  name="width"
                  placeholder="Width"
                  value={formData.width}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="number"
                  name="height"
                  placeholder="Height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <input
                type="number"
                name="faces"
                placeholder="Faces"
                value={formData.faces}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input type="file" name="image" onChange={handleChange} className="border rounded px-3 py-2" />
              <input type="file" name="gallery" multiple onChange={handleChange} className="border rounded px-3 py-2" />
              <input type="file" name="videos" multiple onChange={handleChange} className="border rounded px-3 py-2" />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                    setEditId(null);
                  }}
                  className="px-4 py-2 border rounded border-gray-400 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white hover:opacity-90"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded border-gray-400 text-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
