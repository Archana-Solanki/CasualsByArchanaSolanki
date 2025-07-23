import React, { useEffect, useState } from "react";
import MainCarousel from "../Components/carousel";
import SignatureStyle from "../Components/signatureStyle";
import AboutUs from "../Components/aboutUs";
import banner1 from "../assets/LandingBanner1.jpg";
import banner2 from "../assets/LandingBanner2.jpg";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/productCarousel";
import Contact from "../Components/contactFaq";
import GoogleReviewsCarousel from "../Components/GoogleReviews";
import Footer from "../Components/Footer";
import Grid from "../Components/FashionGallery";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const LandingPage = () => {
  const [carouselProducts1, setCarouselProducts1] = useState([]);
  const [carouselProducts2, setCarouselProducts2] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res1 = await fetch(`${apiUrl}/display/home-female-products`);
        const data1 = await res1.json();
        const mapped1 = Array.isArray(data1)
          ? data1.map((p) => ({
              id: p._id || p.id,
              name: p.productName || p.name,
              price: p.productCost || p.price,
              image: (p.productImages && p.productImages[0]) || p.image,
            }))
          : [];
        setCarouselProducts1(mapped1);

        const res2 = await fetch(`${apiUrl}/display/home-male-products`);
        const data2 = await res2.json();
        const mapped2 = Array.isArray(data2)
          ? data2.map((p) => ({
              id: p._id || p.id,
              name: p.productName || p.name,
              price: p.productCost || p.price,
              image: (p.productImages && p.productImages[0]) || p.image,
            }))
          : [];
        setCarouselProducts2(mapped2);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setCarouselProducts1([]);
        setCarouselProducts2([]);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <MainCarousel />
      <Grid />
      <SignatureStyle />
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold font-display inline-block relative">
          Women's Fashion Picks
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-black rounded-full animate-pulse"></span>
        </h2>
      </div>
      <Carousel items={carouselProducts1} />

      <div className="flex justify-center mt-10 mb-16">
        <button onClick={() => navigate('/shop')} className="bg-black hover:bg-gray-800 text-white text-lg sm:text-xl font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
          Explore Now
        </button>
      </div>

      <img
        src={banner1}
        alt="Banner 1"
        className="w-[80%]  mx-auto object-contain rounded-md"
      />

      <AboutUs />

      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold font-display inline-block relative">
          Men's Fashion Picks
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-black rounded-full animate-pulse"></span>
        </h2>
      </div>
      <Carousel items={carouselProducts2} />

      <div className="flex justify-center mt-10 mb-16">
        <button onClick={() => navigate('/shop')} className="bg-black hover:bg-gray-800 text-white text-lg sm:text-xl font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
          Shop Now
        </button>
      </div>

      <Link to="/shop">
        <img
          src={banner2}
          alt="Banner 2"
          className="w-[80%] mx-auto object-contain rounded-md mb-4 cursor-pointer"
        />
      </Link>

      <GoogleReviewsCarousel />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
