import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/signup';
import Login from './Pages/login';
import LandingPage from './Pages/LandingPage';
import ProfilePage from './Pages/Profile';
import Shopping from './Pages/Shopping';
import ShoppingOpen from './Pages/ShoppingOpen';
import CartItem from './Pages/Cart';
import Blogs from './Pages/blogs';
import Blogopen from './Pages/blogopen';
import Terms from './Pages/termsnc';
import Exchange from './Pages/Exchange';
import Privacy from './Pages/Privacy';
import { CartProvider } from './Components/ContextReducer';
import Order from './Pages/OrderHistory';
import CMS from './Pages/CMSmain';
import ForgotPassword from './Pages/Forgotpassword';
import ResetPassword from './Pages/Resetpassword';

// ✅ Toastify Imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          {/* 🔔 Toast Container accessible from all routes */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<Shopping />} />
            <Route path="/cart" element={<CartItem />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cms" element={<CMS />} />
            <Route path="/product/:id" element={<ShoppingOpen />} />
            <Route path="/blog/:id" element={<Blogopen />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
