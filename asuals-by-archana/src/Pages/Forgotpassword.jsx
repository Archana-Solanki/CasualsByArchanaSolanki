import React, { useState } from 'react';
import { Mail, ArrowLeft, Zap, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/NewLogo1.jpg";


const apiUrl = import.meta.env?.VITE_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  // Simulate navigation function for demo
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${apiUrl}/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Reset link sent successfully! 📧');
      } else {
        throw new Error(data.message || 'Failed to send reset link');
      }
    } catch (err) {
      setStatus('error');
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
                    Check Your Email
                  </h1>
                  <p className="text-gray-600 font-medium">We've sent you a reset link</p>
                </>
              ) : status === 'error' ? (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h1 className="text-3xl font-black text-black mb-2 tracking-tight">
                    Oops!
                  </h1>
                  <p className="text-gray-600 font-medium">Something went wrong</p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                    Reset Password
                  </h1>
                  <div className="w-12 h-1 bg-black mx-auto mb-4 rounded-full"></div>
                  <p className="text-gray-600 font-medium">Enter your email to receive a reset link</p>
                </>
              )}
            </div>

            {status === 'success' ? (
              /* Success State */
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-700 font-medium mb-4">{message}</p>
                  <p className="text-sm text-green-600">
                    Please check your inbox and spam folder. The link will expire in 15 minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setEmail('');
                      setMessage('');
                    }}
                    className="w-full bg-white text-black py-4 px-6 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Try Different Email
                  </button>

                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Back to Login
                  </button>
                </div>
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
                  }}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-2 transition-colors group-focus-within:text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-black" />
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-black placeholder-gray-400 bg-gray-50/50 hover:bg-white hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Sending Reset Link...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Need help?</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 group">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">Contact Support</span>
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">Back to Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}