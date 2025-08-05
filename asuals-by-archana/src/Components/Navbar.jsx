import React, { useState, useRef, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Logo from "../assets/NewLogo.png";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import axios from "axios";
import { useCart } from "./ContextReducer";
const apiUrl = import.meta.env.VITE_API_URL

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const data = useCart();
  useEffect(() => {
    const fetchProfile = async () => {
      
      try {
        const res = await axios.get(`${apiUrl}/profile`,{withCredentials: true});
        const user = res.data;
        setUserData({
          userName: user.userName || "",
          userEmail: user.userEmail || "",
          userNumber: user.userNumber || "",
          userAddress: user.userAddress || "",
          avatar:
            user.avatar ||
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user.userName || "User"),
          joinDate:
            user.joinDate ||
            (user.signUpDate
              ? new Date(user.signUpDate).toLocaleDateString()
              : ""),
        });

        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        if (err.response?.status === 401) {
          setIsLoggedIn(false); // important
        } else {
          alert("Failed to fetch profile. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, []);



  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "https://casuals-by-archana-solanki.vercel.app/shop" },
    { name: "Contact", scrollTo: "contact" }, // scroll target
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollClick = (scrollToId) => {
    if (location.pathname === "/") {
      // Already on home, scroll directly
      scroller.scrollTo(scrollToId, {
        duration: 500,
        smooth: true,
        offset: -70,
      });
    } else {
      // Navigate to home first, then scroll
      navigate("/", { state: { scrollTo: scrollToId } });
    }
    setMenuOpen(false); // close menu on mobile
  };

  const handleLogout = async() => {
    try {
      await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });

      setIsLoggedIn(false);
      setProfileDropdownOpen(false);

      navigate('/')
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed w-full h-24 z-20 top-0 start-0 border-b border-gray-200 shadow-sm dark:bg-black dark:border-gray-700 transition-all">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between pt-6 mx-auto">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center space-x-3">
          <img src={Logo} className="h-16" alt="Brand Logo" />
        </RouterLink>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4 md:order-2">
          <button
            onClick={() => navigate("/cart")}
            className="relative bg-black hover:bg-gray-800 rounded-full p-3 transition"
          >
            <HiOutlineShoppingBag className="text-white text-3xl" />
            {data.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md leading-none">
                {data.length}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-black hover:bg-gray-800 font-medium rounded-full text-3xl px-5 py-2 transition"
              >
                <HiOutlineUser className="text-white text-3xl" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && userData && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="block text-xl text-gray-900 dark:text-white">
                      {userData.userName}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {userData.userEmail}
                    </span>
                  </div>
                  <RouterLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </RouterLink>
                  <RouterLink
                    to="/order"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Orders And History
                  </RouterLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <RouterLink
                to="/login"
                className="text-sm md:text-base font-medium text-black dark:text-white hover:underline"
              >
                Login
              </RouterLink>
              <RouterLink
                to="/signup"
                className="text-sm md:text-base font-medium text-black dark:text-white hover:underline"
              >
                Signup
              </RouterLink>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none rounded-lg md:hidden"
            aria-controls="navbar-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1 bg-black`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 text-xl font-medium text-black dark:text-white mt-4 md:mt-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.scrollTo ? (
                  <span
                    onClick={() => handleScrollClick(link.scrollTo)}
                    className="block py-2 px-3 md:p-0 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {link.name}
                  </span>
                ) : (
                  <RouterLink
                    to={link.path}
                    className={`block py-2 px-3 md:p-0 transition ${location.pathname === link.path
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : "hover:text-gray-600 dark:hover:text-gray-300"
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </RouterLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
