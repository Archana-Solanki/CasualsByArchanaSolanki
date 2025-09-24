import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/NewLogo1.png.jpg";


const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3000/api';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simulate navigation function for demo
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userNumber: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || "Login successful! 🎉");
        navigate("/"); // redirect to home
      } else {
        alert(data.message || "Unexpected response");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gray-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '800ms' }}></div>
        <div className="absolute top-2/3 left-2/3 w-72 h-72 bg-gray-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1200ms' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            {/* Company Logo and Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-28 h-20 mb-4 bg-white rounded-2xl transform hover:rotate-3 transition-transform duration-300">
                <img src={logo} />
              </div>
              <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                Welcome Back
              </h1>
              <div className="w-12 h-1 bg-black mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600 font-medium">Log in to continue your journey</p>
            </div>

            <div className="space-y-6">
              {/* Phone Number Field */}
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
                    value={formData.userNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                    required
                    autoComplete="tel"
                  />
                </div>
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
                    value={formData.userPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-black hover:text-gray-700 hover:underline transition-all duration-200 inline-flex items-center group"
                >
                  Forgot your password?
                  <div className="ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200">→</div>
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Logging in...
                  </span>
                ) : (
                  'Log In'
                )}
              </button>
            </div>

            {/* Social Login Divider */}
            <div className="my-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Quick Access</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 group" onClick={() => navigate('/')}>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">Guest Mode</span>
                </button>
                <button className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 group">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">Support</span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">New here?</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <a
                href="/signup"
                className="inline-flex items-center text-black font-bold hover:text-gray-700 transition-all duration-200 text-lg group"
              >
                Create Account
                <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}