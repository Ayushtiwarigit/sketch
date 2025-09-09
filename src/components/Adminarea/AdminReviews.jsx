// src/pages/admin/AdminReviews.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, clearReviewState } from "../../redux/slices/reviewSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const { allReviews, loading, error } = useSelector((state) => state.reviews);

  // ✅ Fetch reviews on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAllReviews(token));
    } else {
      toast.error("Admin token missing!");
    }

    return () => {
      dispatch(clearReviewState());
    };
  }, [dispatch]);

  // ✅ Show error toast
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);
 useEffect(() => {
        document.title = "SketchWebsite - AdminReviews";
      }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Reviews</h2>
        <button
          onClick={() => {
            const token = localStorage.getItem("admintoken");
            if (token) dispatch(getAllReviews(token));
          }}
          className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-4 py-2 rounded shadow"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Reviewer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Loading reviews...
                </td>
              </tr>
            ) : allReviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No reviews found.
                </td>
              </tr>
            ) : (
              allReviews.map((review, idx) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">
                    {review.product?.title || (
                      <span className="text-gray-400 italic">Deleted Product</span>
                    )}
                  </td>
                  <td className="p-2 border">{review.name}</td>
                  <td className="p-2 border text-gray-600">{review.email}</td>
                  <td className="p-2 border text-yellow-600 font-bold">
                    ⭐ {review.rating}
                  </td>
                  <td className="p-2 border">{review.comment}</td>
                  <td className="p-2 border">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
