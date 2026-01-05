import React, { useEffect, useState } from "react";
import MainCarousel from "../Components/carousel";
import SignatureStyle from "../Components/signatureStyle";
import AboutUs from "../Components/aboutUs";
import banner1 from "../assets/LandingBanner1.jpg";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/productCarousel";
import Contact from "../Components/contactFaq";
import GoogleReviewsCarousel from "../Components/Reviews";
import Footer from "../Components/Footer";
import Grid from "../Components/FashionGallery";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

const apiUrl = import.meta.env.VITE_API_URL;

const LandingPage = () => {
  const [carouselProducts1, setCarouselProducts1] = useState([]);
  const [carouselProducts2, setCarouselProducts2] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     SEO: Page-level H1 (invisible)
     ========================= */
  const SeoH1 = () => (
    <section className="sr-only">
      <h1>Casual Clothing Store by Archana Solanki</h1>
      <p>
        Casuals by Archana Solanki is a modern fashion brand offering women’s,
        men’s, and unisex casual wear with contemporary designs and everyday comfort.
      </p>
    </section>
  );

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          duration: 500,
          smooth: true,
          offset: -70,
        });
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [location]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res1 = await fetch(`${apiUrl}/display/home-female-products`);
        const data1 = await res1.json();
        setCarouselProducts1(
          Array.isArray(data1)
            ? data1.map((p) => ({
                id: p._id || p.id,
                name: p.productName || p.name,
                price: p.productCost || p.price,
                image: p.productImages?.[0] || p.image,
              }))
            : []
        );

        const res2 = await fetch(`${apiUrl}/display/home-male-products`);
        const data2 = await res2.json();
        setCarouselProducts2(
          Array.isArray(data2)
            ? data2.map((p) => ({
                id: p._id || p.id,
                name: p.productName || p.name,
                price: p.productCost || p.price,
                image: p.productImages?.[0] || p.image,
              }))
            : []
        );
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <SeoH1 />

      <div id="top">
        <Navbar />
      </div>

      <main>
        <section aria-label="Featured banners">
          <MainCarousel />
        </section>

        <section aria-label="Fashion gallery">
          <Grid />
        </section>

        <section aria-label="Signature styles">
          <SignatureStyle />
        </section>

        {/* =========================
            WOMENS
           ========================= */}
        <section aria-labelledby="womens-heading">
          <div className="text-center mb-16">
            <h2
              id="womens-heading"
              className="text-4xl font-extrabold font-display inline-block relative"
            >
              Shop Women’s
            </h2>
          </div>
          <Carousel items={carouselProducts1} />
        </section>

        {/* =========================
            MENS
           ========================= */}
        <section aria-labelledby="mens-heading">
          <div className="text-center mb-16">
            <h2
              id="mens-heading"
              className="text-4xl font-extrabold font-display inline-block relative"
            >
              Shop Men’s
            </h2>
          </div>
          <Carousel items={carouselProducts2} />
        </section>

        {/* =========================
            UNISEX
           ========================= */}
        <section aria-labelledby="unisex-heading">
          <div className="text-center mb-16">
            <h2
              id="unisex-heading"
              className="text-4xl font-extrabold font-display inline-block relative"
            >
              Shop Unisex
            </h2>
          </div>
          <Carousel items={carouselProducts2} />
        </section>

        <section id="about-us">
          <AboutUs />
        </section>

        <section aria-label="Shop banner">
          <Link to="/shop">
            <img
              src={banner1}
              alt="Explore casual fashion collections by Archana Solanki"
              className="w-[80%] mx-auto object-contain rounded-2xl"
            />
          </Link>
        </section>

        <section aria-label="Customer reviews">
          <GoogleReviewsCarousel />
        </section>

        <section id="contact">
          <Contact />
        </section>

        {/* =========================
            SEO FOOTER (minimal)
           ========================= */}
        <section className="max-w-6xl mx-auto px-6 py-12 text-sm text-neutral-500">
          <p>
            Discover curated casual wear collections for women, men, and unisex
            fashion at Casuals by Archana Solanki. Explore everyday essentials,
            modern silhouettes, and thoughtfully designed apparel crafted for
            comfort and versatility.
          </p>

          <nav className="sr-only">
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
