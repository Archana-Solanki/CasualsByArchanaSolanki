import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useCartActions } from "../Helper/CartHelper";
const apiUrl = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null)
  const [cartData, setCartData] = useState([]);

  const { updateCartItem, removeFromCart, clearCart, addToCart } = useCartActions();

  useEffect(() => {
    const loadCart = async () => {
      const res = await axios.get(`${apiUrl}/cart`, { withCredentials: true });
      const normalized = res.data.map(item => ({
        id: item.productID._id,
        name: item.productID.productName,
        price: item.productID.productCost,
        discount: item.productDiscount || 0,
        color: item.productColor,
        size: item.productSize,
        img: item.productID.productImages?.[0] || "",
        quantity: item.productQuantity || 1,
        returnPolicy: item.exchangePolicy ? "Exchangeable" : "Non-exchangeable",
        deliveryExpectation: item.deliveryTime || "2-4 business days",
      }));
      setCartData(normalized);
    };

    loadCart();
  }, []);

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


  const updateQuantity = async (id, size, color, delta) => {
    const item = cartData.find(
      (item) => item.id === id && item.size === size && item.color === color
    );
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity < 1) return; // prevent negative quantity

    // Call backend with the **new quantity**
    await updateCartItem(id, newQuantity, color, size);

    // Update local state immediately
    setCartData((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.color === color
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  // Remove item using both size and color
  const removeItem = async (id, size, color) => {
    await removeFromCart(id, size, color);

    setCartData((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const [showModal, setShowModal] = useState(false);

  // initialize checkout data to avoid null access when modal opens
  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryPincode: "",
    deliveryCity: "",
    deliveryState: "",
    deliveryInstructions: "",
    paymentType: "UPI",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  useEffect(() => {
    if (userDetails) {
      setCheckoutData((prev) => ({
        ...prev,
        customerName: userDetails.userName || "",
        customerEmail: userDetails.userEmail || "",
        customerPhone: userDetails.userNumber || "",
        deliveryAddress: userDetails.userAddressLine1 + " " + userDetails.userAddressLine2 || "",
        deliveryPincode: userDetails.userAddressPincode || "",
        deliveryCity: userDetails.userAddressCity || "",
        deliveryState: userDetails.userAddressState || "",
      }));
    }
  }, [userDetails]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    try {
      // Step 1: Create Razorpay order on backend
      const orderRes = await axios.post(`${apiUrl}/payment/create-order`, {
        amount: total,
        currency: "INR",
      });

      const { orderId, amount, currency } = orderRes.data;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "FastTrade Sarees",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyRes = await axios.post(`${apiUrl}/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
              
            if (verifyRes.data.success) {
              // Step 4: Save order to DB
              const orderPayload = {
                ...checkoutData,
                productsBought: cartData.map((item) => ({
                  productID: item.id,
                  productName: item.name,
                  size: item.size,
                  productColour: item.color,
                  quantity: item.quantity,
                  price: item.price,
                })),
                orderTotal: total,
                paymentStatus: "paid",
                orderStatus: "confirmed",
              };
              
              await axios.post(`${apiUrl}/user/order/newOrder`, orderPayload);
              alert("✅ Payment successful! Order placed successfully.");
              clearCart();
              setCartData([]);
              setShowModal(false);
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          }
        },
        theme: { color: "#0f172a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
      alert("Could not start payment process.");
    }
  };
  const subtotal = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // const tax = subtotal * 0.08;
  const total = subtotal;

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
          {cartData.length === 0 ? (
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
                  {cartData.map((item, idx) => (
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

                              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>

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
                                Exchange Policy:
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
                                  "2-4 business days"}
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
                        {cartData.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span className="font-medium text-black">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium text-black">
                        ₹{tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div> */}
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
                    {/* <p className="text-xs text-gray-500">
                      Free shipping on orders over ₹75
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
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

              {/* Separate Address Fields */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Delivery Address</h3>

                <input
                  type="text"
                  name="deliveryAddress"
                  value={checkoutData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Address Line 1 (House/Flat/Street)"
                  className="w-full border rounded px-4 py-2 mb-3"
                  required
                />

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    name="deliveryPincode"
                    value={checkoutData.deliveryPincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="w-full border rounded px-4 py-2"
                    maxLength="6"
                    required
                  />
                  <input
                    type="text"
                    name="deliveryCity"
                    value={checkoutData.deliveryCity}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full border rounded px-4 py-2"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="deliveryState"
                  value={checkoutData.deliveryState}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

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
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 ${isPlacingOrder ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={isPlacingOrder}
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrderSubmit}
                  className={`px-4 py-2 bg-black text-white rounded ${isPlacingOrder ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    'Place Order'
                  )}
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
