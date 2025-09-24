import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff, MapPin, Zap } from 'lucide-react';
import logo from "../assets/NewLogo1.png.jpg";
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api';

export default function SignUpPage() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userName: '',
    userNumber: '',
    userEmail: '',
    userPassword: '',
    userAddressLine1: '',
    userAddressLine2: '',
    userAddressPincode: '',
    userAddressCity: '',
    userAddressState: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!credentials.userName.trim()) {
      newErrors.userName = 'Name is required';
    } else if (credentials.userName.trim().length < 2) {
      newErrors.userName = 'Name must be at least 2 characters';
    }

    // Phone number
    if (!credentials.userNumber.trim()) {
      newErrors.userNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(credentials.userNumber.replace(/\D/g, ''))) {
      newErrors.userNumber = 'Please enter a valid 10-digit phone number';
    }

    // Email
    if (!credentials.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.userEmail)) {
      newErrors.userEmail = 'Please enter a valid email address';
    }

    // Password (minlength 8, at least one uppercase, one lowercase, one digit)
    if (!credentials.userPassword) {
      newErrors.userPassword = 'Password is required';
    } else if (credentials.userPassword.length < 8) {
      newErrors.userPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(credentials.userPassword)) {
      newErrors.userPassword =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Address Line 1
    if (!credentials.userAddressLine1.trim()) {
      newErrors.userAddressLine1 = 'Address Line 1 is required';
    } else if (credentials.userAddressLine1.trim().length < 5) {
      newErrors.userAddressLine1 = 'Please enter a valid address';
    }

    // Pincode
    if (!credentials.userAddressPincode.trim()) {
      newErrors.userAddressPincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(credentials.userAddressPincode.trim())) {
      newErrors.userAddressPincode = 'Please enter a valid 6-digit pincode';
    }

    // City
    if (!credentials.userAddressCity.trim()) {
      newErrors.userAddressCity = 'City is required';
    } else if (credentials.userAddressCity.trim().length < 2) {
      newErrors.userAddressCity = 'Please enter a valid city name';
    }

    // State
    if (!credentials.userAddressState.trim()) {
      newErrors.userAddressState = 'State is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    // Check if there are any validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if there are errors
    }

    // Clear any previous errors
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        `${apiUrl}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      const json = await response.json();
      setLoading(false);

      if (!json.success) {
        // Handle specific error messages from server
        if (json.error && json.error.includes('duplicate') || json.error && json.error.includes('E11000')) {
          setErrors({ userEmail: "This email is already registered. Please use a different email." });
        } else {
          setErrors({ general: json.message || "Signup failed. Please try again." });
        }
      } else {
        alert("🎉 Signup successful!");
        navigate('/login');
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/30 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Company Logo and Name */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-28 h-20 mb-4 bg-white rounded-2xl transform hover:rotate-3 transition-transform duration-300">
                <img src = {logo}/>
              </div>
              <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                Casuals
                <span className="block text-lg font-normal text-gray-600 tracking-wide">By Archana Solanki</span>
              </h1>
              <div className="w-16 h-1 bg-black mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600 font-medium">Join the future of fashion</p>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                  <input
                    type="text"
                    id="name"
                    name="userName"
                    value={credentials.userName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.userName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userName}</p>}
              </div>

              {/* Phone Field */}
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                  <input
                    type="tel"
                    id="phone"
                    name="userNumber"
                    value={credentials.userNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.userNumber && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userNumber}</p>}
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                  <input
                    type="email"
                    id="email"
                    name="userEmail"
                    value={credentials.userEmail}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.userEmail && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userEmail}</p>}
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="userPassword"
                    value={credentials.userPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.userPassword && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userPassword}</p>}
              </div>

              {/* Address Line 1 */}
              <div className="group">
                <label htmlFor="addressLine1" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                  Address Line 1
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                  <input
                    type="text"
                    id="addressLine1"
                    name="userAddressLine1"
                    value={credentials.userAddressLine1}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="House/Flat/Street"
                  />
                </div>
                {errors.userAddressLine1 && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userAddressLine1}</p>}
              </div>

              {/* Address Line 2 */}
              <div>
                <label htmlFor="addressLine2" className="block text-sm font-semibold text-black mb-2">
                  Address Line 2 <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="userAddressLine2"
                  value={credentials.userAddressLine2}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                  placeholder="Area / Landmark"
                />
              </div>

              {/* Pincode and City - Separate Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-black mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="userAddressPincode"
                    value={credentials.userAddressPincode}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="411001"
                    maxLength="6"
                  />
                  {errors.userAddressPincode && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.userAddressPincode}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-black mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="userAddressCity"
                    value={credentials.userAddressCity}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                    placeholder="Pune"
                  />
                  {errors.userAddressCity && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.userAddressCity}</p>
                  )}
                </div>
              </div>

              {/* State Field */}
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-black mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="userAddressState"
                  value={credentials.userAddressState}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                  placeholder="Enter your State"
                />
                {errors.userAddressState && <p className="text-red-500 text-sm mt-2 font-medium">{errors.userAddressState}</p>}
              </div>

              {/* Display general errors */}
              {errors.general && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">{errors.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Already a member?</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <a 
                href="/login" 
                className="inline-flex items-center text-black font-bold hover:text-gray-700 transition-all duration-200 text-lg group"
              >
                Log In
                <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}