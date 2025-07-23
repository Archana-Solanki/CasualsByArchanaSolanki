import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${apiUrl}/profile`, {withCredentials: true});
      const user = res.data;

      setUserData({
        userEmail: user.userEmail,
      });
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if(!userData?.userEmail)
        return;
      
      const email = userData.userEmail
      try {
        setLoading(true);
        const res = await axios.post(`${apiUrl}/user/order/user-orders`, {email})
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
        } else {
          alert("Failed to fetch orders. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userData]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-white" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-white" />;
      case "processing":
        return <Clock className="w-5 h-5 text-white" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-white" />;
      default:
        return <Package className="w-5 h-5 text-white" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-black";
      case "shipped":
        return "bg-gray-700";
      case "processing":
        return "bg-gray-500";
      case "cancelled":
        return "bg-gray-400";
      default:
        return "bg-gray-600";
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">Order #{order.orderID}</h3>
          <p className="text-gray-600">
            {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : new Date().toLocaleDateString()}
          </p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
          {getStatusIcon(order.orderStatus)}
          <span className="text-white font-medium capitalize">
            {order.orderStatus || "Pending"}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <Package className="w-4 h-4 text-gray-600" />
          <span className="text-gray-800">
            {order.productsBought?.length || 0} item(s)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <CreditCard className="w-4 h-4 text-gray-600" />
          <span className="text-gray-800 font-semibold">
            ₹{order.orderTotal || "0.00"}
          </span>
        </div>

        {order.deliveryAddress && (
          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-800 text-sm">
              {order.deliveryAddress}
            </span>
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setSelectedOrder(order)}
          className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  const OrderDetailModal = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-black">#{order.orderID}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-black">
                {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
                {getStatusIcon(order.orderStatus)}
                <span className="text-white font-medium capitalize">
                  {order.orderStatus || "Pending"}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-semibold text-black">₹{order.orderTotal || "0.00"}</p>
            </div>
          </div>

          {order.productsBought && order.productsBought.length > 0 && (
            <div>
              <h3 className="font-semibold text-black mb-3">Items</h3>
              <div className="space-y-3">
                {order.productsBought.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-black">{item.productName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-semibold text-black">₹{item.price || "0.00"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.deliveryAddress && (
            <div>
              <h3 className="font-semibold text-black mb-2">Delivery Address</h3>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{order.deliveryAddress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="pt-20">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h2>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order, index) => (
                  <OrderCard key={order._id || index} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default OrdersPage;
