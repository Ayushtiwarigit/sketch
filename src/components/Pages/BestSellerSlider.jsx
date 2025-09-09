import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { fetchBestsellers } from "../../redux/slices/bestsellersSlice";

export default function BestSellerSlider() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.bestsellers);

  useEffect(() => {
    dispatch(fetchBestsellers());
  }, [dispatch]);

  if (loading) return <p className="text-center py-8">Loading bestsellers...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  if (!items.length) return <p className="text-center py-8">No bestsellers available</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          🔥 Best Sellers
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="pb-10"
        >
          {items.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4 text-center mt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-84 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{product.bio}</p>

                 <div className="absolute top-15 right-8 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    Best Seller
                  </div>

                {/* <div className="mt-3 flex justify-center">
                  <WhatsAppOrderButton productName={product.name} />
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Use plain <style> for Vite */}
      <style>{`
        .swiper-pagination-bullet {
          background: linear-gradient(to right, #d4a373, #b9855c) !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
