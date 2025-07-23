import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export default function SignUpPage() {

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userName: '',
    userNumber: '',
    userEmail: '',
    userPassword: '',
    userAddress: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(null)

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
    
    if (!credentials.userName.trim()) {
      newErrors.userName = 'Name is required';
    }
    
    if (!credentials.userNumber.trim()) {
      newErrors.userNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(credentials.userNumber.replace(/\D/g, ''))) {
      newErrors.userNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!credentials.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.userEmail)) {
      newErrors.userEmail = 'Please enter a valid email address';
    }
    
    if (!credentials.userPassword) {
      newErrors.userPassword = 'Password is required';
    } else if (credentials.userPassword.length < 6) {
      newErrors.userPassword = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
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
        setErrors("Signup failed. Please try again.");
      } else {
        alert("🎉 Signup successful!");
        // Handle successful signup (redirect, etc.)
      }
    } catch (error) {
      setErrors("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="name"
                  name="userName"
                  value={credentials.userName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-black placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  id="phone"
                  name="userNumber"
                  value={credentials.userNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-black placeholder-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.userNumber && <p className="text-red-500 text-sm mt-1">{errors.userNumber}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="userEmail"
                  value={credentials.userEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-black placeholder-gray-500"
                  placeholder="Enter your email address"
                />
              </div>
              {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="userPassword"
                  value={credentials.userPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-black placeholder-gray-500"
                  placeholder="Enter your password(min 8 letter)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.userPassword && <p className="text-red-500 text-sm mt-1">{errors.userPassword}</p>}
            </div>

    
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-black mb-2">
                Address
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type= "text"
                  id="address"
                  name="userAddress"
                  value={credentials.userAddress}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-black placeholder-gray-500"
                  placeholder="Enter your Address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transform hover:scale-105 transition-all duration-200"
            >
              Create Account
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="login" className="text-black font-medium hover:underline transition-all duration-200">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}