import React from "react";
import { Link, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="flex flex-col items-start gap-1 sm:gap-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Casuals By
                </h2>
                <p className="text-xl sm:text-2xl text-gray-300 font-light">
                  Archana Solanki
                </p>
              </div>

            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Elevating your style with premium casual wear. Where comfort meets sophistication.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <div className="space-y-3">
              <a href="#about-us" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform">
                About Us
              </a>
              <Link to="/shop" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform">
                Collections
              </Link>
              <Link to="/blogs" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform">
                Blogs
              </Link>
              <Link to="#contact" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform">
                Contact
              </Link>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <Link to="#" className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link to="#" className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </Link>
              <Link to="#" className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for style inspiration and latest updates
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">

            {/* Policy Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Privacy Policy
              </Link>
              <Link to="/exchange" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Exchange Policy
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center lg:order-2">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-white font-medium">Casuals By Archana Solanki</span>
              </p>
              <p className="text-gray-500 text-xs">All Rights Reserved</p>
            </div>

            {/* Developer Credit */}
            <div className="text-right lg:order-3">
              <p className="text-gray-400 text-sm">
                Developed by{" "}
                <a
                  href="https://radigitalsolution.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-300 font-medium hover:underline"
                >
                  RA Digital Solutions
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                <a href="tel:+918788292204" className="hover:text-gray-400 transition-colors duration-300">
                  +91 8983985787<br />
                  +91 9028802444
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        {/* <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full"></div>
        </div> */}
      </div>
    </footer>
  );
}