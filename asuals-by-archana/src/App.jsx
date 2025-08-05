import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Pages/signup';
import Login from './Pages/login';
import LandingPage from './Pages/LandingPage';
import ProfilePage from './Pages/Profile';
import Shopping from './Pages/Shopping';
import ShoppingOpen from './Pages/ShoppingOpen';
import CartItem from './Pages/Cart';
import { CartProvider } from './Components/ContextReducer';
import Order from './Pages/OrderHistory'
import CMS from './Pages/CMSmain'
import ForgotPassword from './Pages/Forgotpassword';
import ResetPassword from './Pages/Resetpassword';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/shop' element={<Shopping />} />
            <Route path='/cart' element={<CartItem />} />
            <Route path='/order' element={<Order />} />
            <Route path='/cms' element={<CMS />} />
            <Route path="/product/:id" element={<ShoppingOpen />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
