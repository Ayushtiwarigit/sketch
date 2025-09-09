import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchTestimonials } from "../../redux/slices/testimonialsSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows
const Arrow = ({ className, style, onClick }) => (
  <button
    className={className}
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#b9855c",
      borderRadius: "50%",
      width: 40,
      height: 40,
      zIndex: 10,
      border: "none",
      cursor: "pointer",
    }}
    onClick={onClick}
    aria-label="carousel arrow"
  />
);

const TestimonialsCarousel = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials(5)); // fetch more than slidesToShow
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-center py-4 text-gray-800">Loading testimonials...</p>;
  if (status === "failed")
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  // Maximum slides to show depending on items
  const slidesToShow = Math.min(items.length, 3);

  const settings = {
    dots: true,
    infinite: items.length > 1,
    speed: 700,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: items.length > 1,
    autoplaySpeed: 4000,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    centerMode: false, // ensure no extra slides are centered
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: Math.min(items.length, 2),
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1, // **force 1 slide**
          slidesToScroll: 1,
          arrows: false,   // hide arrows on small screens
        },
      },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Clients Say</h2>
        <p className="text-gray-600 mt-2 sm:text-lg">Hear directly from our satisfied clients!</p>
      </div>

      <Slider {...settings}>
        {items.map((t) => (
          <div key={t._id} className="px-2 sm:px-3">
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <img
                src={t.screenshot}
                alt={`Screenshot by ${t.name}`}
                className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-900 font-semibold text-center">
                {t.name.replace(/"/g, "")}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsCarousel;
