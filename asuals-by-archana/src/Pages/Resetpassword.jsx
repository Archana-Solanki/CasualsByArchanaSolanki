import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, Eye, EyeOff, Zap, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import logo from "../assets/NewLogo1.png.jpg";


const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = {};

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const validationErrors = validatePassword(newPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch(`${apiUrl}/user/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || "Password reset successfully! 🎉");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleInputChange = (field, value) => {
    if (field === 'newPassword') {
      setNewPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
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
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            {/* Back Button */}
            <button
              onClick={handleBackToLogin}
              className="absolute -top-2 -left-2 p-3 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              aria-label="Back to login"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Header */}
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center justify-center w-28 h-20 mb-4 bg-white rounded-2xl transform hover:rotate-3 transition-transform duration-300">
                <img src={logo} />
              </div>

              {status === 'success' ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-black text-black mb-2 tracking-tight">
                    Password Reset!
                  </h1>
                  <p className="text-gray-600 font-medium">Redirecting to login...</p>
                </>
              ) : status === 'error' ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h1 className="text-3xl font-black text-black mb-2 tracking-tight">
                    Reset Failed
                  </h1>
                  <p className="text-gray-600 font-medium">Please try again</p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                    New Password
                  </h1>
                  <div className="w-12 h-1 bg-black mx-auto mb-4 rounded-full"></div>
                  <p className="text-gray-600 font-medium">Create a strong, secure password</p>
                </>
              )}
            </div>

            {status === 'success' ? (
              /* Success State */
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-700 font-medium mb-2">{message}</p>
                  <p className="text-sm text-green-600">
                    You will be redirected to login in a few seconds...
                  </p>
                </div>

                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Go to Login Now
                </button>
              </div>
            ) : status === 'error' ? (
              /* Error State */
              <div className="space-y-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                  <p className="text-red-700 font-medium">{message}</p>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setMessage('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6">
                {/* New Password Field */}
                <div className="group">
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      disabled={status === 'loading'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={status === 'loading'}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      disabled={status === 'loading'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={status === 'loading'}
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-2 font-medium">{errors.confirmPassword}</p>}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-black mb-2">Password Requirements:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className={`flex items-center ${newPassword.length >= 8 ? 'text-green-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/(?=.*[a-z])/.test(newPassword) ? 'text-green-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[a-z])/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One lowercase letter
                    </li>
                    <li className={`flex items-center ${/(?=.*[A-Z])/.test(newPassword) ? 'text-green-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[A-Z])/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One uppercase letter
                    </li>
                    <li className={`flex items-center ${/(?=.*\d)/.test(newPassword) ? 'text-green-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${/(?=.*\d)/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One number
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  onClick={handleReset}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Resetting Password...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Secure Reset</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <p className="text-xs text-gray-500">
                🔒 This link will expire soon for your security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
