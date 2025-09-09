import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchProducts } from "../../redux/slices/productSlice.js";
import WhatsAppOrderButton from "../Button/WhatsAppOrderButton";

export default function Gallery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading Gallery...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          🖼️ Our Gallery
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
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
          className="pb-12"
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col h-full mt-5 mb-5"
              >
                {/* Image */}
                <div
                  className="relative w-full h-84"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    ₹{item.price?.toLocaleString()}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between min-h-[150px]">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* ✅ WhatsApp Order Button */}
                  <div className="mt-3 flex justify-center ">
                    <WhatsAppOrderButton productName={item.title} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper custom style */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: linear-gradient(to right, #d4a373, #b9855c) !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.3);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #b9855c;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255,255,255,1);
        }
      `}</style>
    </section>
  );
}
