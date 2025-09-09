import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviewsByProduct } from "../../redux/slices/reviewSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const ReviewSection = ({ productId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { productReviews, loading, successMessage, error } = useSelector(
    (state) => state.reviews
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Fetch reviews
  useEffect(() => {
    dispatch(getReviewsByProduct(productId));
  }, [dispatch, productId]);
    useEffect(() => {
      document.title = "SketchWebsite - Reviews";
    }, []);

  // Check if user already reviewed
  const alreadyReviewed = productReviews?.some(
    (rev) => rev.email === user?.email
  );

  useEffect(() => {
    if (successMessage) toast.success(successMessage);
    if (error) toast.error(error);
  }, [successMessage, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to post a review");
      return;
    }
    if (alreadyReviewed) {
      toast.info("You have already submitted a review for this product");
      return;
    }

    dispatch(addReview({ productId, rating, comment, token }));
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-10 border-t pt-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>

      <AnimatePresence>
        {productReviews.length === 1 && (
          <motion.div
            key={productReviews[0]._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
                  <span className="text-gray-800 fw-bold font-medium">
                {productReviews[0].name}
              </span>
              <span className="text-yellow-500 font-semibold">
                {productReviews[0].rating}⭐
              </span>
            
            </div>
            <p className="text-gray-700 mt-2">{productReviews[0].comment}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!alreadyReviewed && (
        <motion.form
          className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="font-medium text-gray-700">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded p-2 w-24"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}⭐
              </option>
            ))}
          </select>

          <label className="font-medium text-gray-700">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={4}
            placeholder="Write your review..."
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#d4a373] to-[#b9855c] hover:bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200 hover:scale-105"
          >
            {loading ? "Posting..." : "Post Review"}
          </button>
        </motion.form>
      )}

      {alreadyReviewed && (
        <p className="mt-4 text-gray-600 font-medium">
          You have already posted a review for this product.
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
