import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, { withCredentials: true });
        if (res.status === 200)
          setUserDetails(res.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchDetails();
  }, []);


  // Update quantity using both size and color
  const updateQuantity = (id, size, color, change) => {
    const item = cartItems.find((item) => item.id === id && item.size === size && item.color === color);
    if (!item) return;
    // Prevent quantity from going below 1
    if (item.quantity + change < 1) return;
    dispatch({
      type: "UPDATE",
      id,
      size,
      color,
      quantity: change,
      name: item.name,
      price: item.price,
      mrp: item.mrp,
    });
  };


  // Remove item using both size and color
  const removeItem = (id, size, color) => {
    dispatch({ type: "REMOVE", id, size, color });
  };

  const [showModal, setShowModal] = useState(false);

  const [checkoutData, setCheckoutData] = useState(null);
  useEffect(() => {
  if (userDetails) {
    setCheckoutData((prev) => ({
      ...prev,
      customerName: userDetails.userName || "",
      customerEmail: userDetails.userEmail || "",
      customerPhone: userDetails.userNumber || "",
      deliveryAddress: userDetails.userAddress || "",
    }));
  }
}, [userDetails]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    const orderPayload = {
      ...checkoutData,
      productsBought: cartItems.map((item) => ({
        productID: item.id,
        productName: item.name,
        productCategory: item.category || "",
        productColour: item.color || "",
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        productDiscount: item.discount || 0,
      })),
      orderTotal: total,
      paymentStatus: "pending", // until confirmed
      orderStatus: "pending",
    };

    try {
      const res = await fetch(`${apiUrl}/user/order/newOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order placed successfully!");
        dispatch({ type: "DROP" });
        setShowModal(false);
      }
      else {
        alert("Order failed: " + data.message);
      }
    } catch (err) {
      console.error("Order submit error:", err);
      alert("Something went wrong.");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Continue Shopping</span>
              </button>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-black" />
                <h1 className="text-xl font-semibold text-black">
                  Shopping Cart
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600">
                Start shopping to add items to your cart
              </p>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
              {/* Cart Items */}
              <div className="lg:col-span-8 pt-6">
                <div className="space-y-6">
                  {cartItems.map((item, idx) => (
                    <div
                      key={item.id + "-" + item.size + "-" + item.color + "-" + idx}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              item.img ||
                              item.image ||
                              "https://via.placeholder.com/300x400?text=No+Image"
                            }
                            alt={item.name}
                            className="h-32 w-24 object-cover rounded-md border border-gray-200"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-black mb-2">
                            {item.name}
                          </h3>

                          {/* Color Display */}
                          <div className="mb-2 flex items-center">
                            <span className="block text-sm font-medium text-gray-700 mr-2">Color:</span>
                            <span className="inline-block w-5 h-5 rounded-full border border-gray-300 mr-2" style={{ backgroundColor: item.color || '#eee' }} title={item.color}></span>
                            <span className="text-xs text-gray-700">{item.color}</span>
                          </div>

                          {/* Size Display Only */}
                          <div className="mb-3">
                            <span className="block text-sm font-medium text-gray-700 mb-1">Size:</span>
                            <span className="text-base font-semibold text-black">{item.size}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Quantity
                            </span>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.size, item.color, -1)
                                }
                                className="p-1 hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.size, item.color, 1)
                                }
                                className="p-1 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Return Policy:
                              </span>
                              <p className="font-medium text-black">
                                {item.returnPolicy}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Delivery:</span>
                              <p className="font-medium text-black">
                                {item.deliveryExpectation ||
                                  item.deliveryTime ||
                                  "3-5 business days"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className="text-right">
                            <p className="text-lg font-semibold text-black">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0 pt-6">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-black mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal (
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span className="font-medium text-black">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium text-black">
                        ₹{tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-black">
                          Total
                        </span>
                        <span className="text-lg font-semibold text-black">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
                    onClick={() => setShowModal(true)}
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Free shipping on orders over ₹75
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="customerName"
                value={checkoutData.customerName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full border rounded px-4 py-2"
                required
              />
              <input
                type="email"
                name="customerEmail"
                value={checkoutData.customerEmail}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="tel"
                name="customerPhone"
                value={checkoutData.customerPhone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full border rounded px-4 py-2"
                required
              />
              <textarea
                name="deliveryAddress"
                value={checkoutData.deliveryAddress}
                onChange={handleInputChange}
                placeholder="Full Delivery Address"
                className="w-full border rounded px-4 py-2"
                required
              ></textarea>
              <textarea
                name="deliveryInstructions"
                value={checkoutData.deliveryInstructions}
                onChange={handleInputChange}
                placeholder="Any delivery instructions (optional)"
                className="w-full border rounded px-4 py-2"
              ></textarea>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  name="paymentType"
                  value={checkoutData.paymentType}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="Cash">Cash on Delivery</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrderSubmit}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
