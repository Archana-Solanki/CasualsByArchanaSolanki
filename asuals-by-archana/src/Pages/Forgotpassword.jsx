import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
      setStatus('success');
      setMessage(response.data.message || 'Reset link sent successfully!');
    } catch (err) {
      setStatus('error');
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
