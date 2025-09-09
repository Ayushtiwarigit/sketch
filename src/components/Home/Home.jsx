import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Bannerpage from '../Pages/Banner/Bannerpage';
import BestSellerSlider from '../Pages/BestSellerSlider';
import Works from '../Pages/Works';
import PricingSection from '../Pages/PricingData';
import FAQ from '../Pages/Faq';
import Gallery from '../Pages/Gallery';
import Footer from '../Footer/Footer';
import TestimonialsCarousel from '../Pages/TestimonialsCarousel';

const Home = () => {
  useEffect(() => {
    document.title = "SketchWebsite - Homepage";
  }, []);

  return (
    <>
      <Header />
      <Bannerpage />
      <BestSellerSlider />
      <Gallery />
      <Works />
      <PricingSection />
          <TestimonialsCarousel />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
