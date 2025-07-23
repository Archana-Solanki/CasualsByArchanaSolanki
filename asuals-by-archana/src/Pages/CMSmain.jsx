import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  Package,
  TrendingUp,
  Search,
} from "lucide-react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const CMSDashboard = () => {
  // State for size/qty inputs per color
  const [newSize, setNewSize] = useState({});
  const [newQty, setNewQty] = useState({});

  //add category
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    gender: "Unisex",
  });

  const handleAddCategory = async () => {
    const { name, gender } = categoryForm;

    // Validation
    if (!name) {
      alert("Please enter name for the category.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/manage/add-category`, {
        name,
        gender,
      },{withCredentials: true});

      if (response.data.success) {
        // Update local dropdown list with new category
        setCategories((prevList) => [...prevList, name]);

        // Reset form
        setCategoryForm({
          name: "",
          gender: "Unisex",
        });

        // Close modal
        setShowCategoryModal(false);
      } else {
        alert(response.data.message || "Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Something went wrong while adding the category.");
    }
  };

  // State for color input
  const [newColor, setNewColor] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/manage/all-products`)
      .then((res) => res.json())
      .then((data) =>
        setProducts(Array.isArray(data) ? data.map(formatProduct) : [])
      )
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/manage/all-users`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) =>
        setCustomers(Array.isArray(data) ? data.map(formatUser) : [])
      )
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/manage/all-orders`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const sorted = data.data
            .map(formatOrder)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setOrders(sorted);
        }
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);
  // Format helpers
  const formatProduct = (product) => {
    const stock = product.productStock || {};
    let isActive = Object.values(stock).some((sizes) =>
      Object.values(sizes).some((qty) => Number(qty) > 0)
    );
    return {
      id: product._id,
      name: product.productName,
      category: product.productCategory?.name || "",
      price: product.productCost,
      stock,
      image: product.productImages?.[0] || "",
      status: isActive ? "active" : "inactive",
    };
  };

  const formatUser = (user, index) => ({
    id: user._id || index,
    name: user.userName || "",
    email: user.userEmail || "",
    phone: user.userNumber || "",
    orders: user.orders || 0,
    address: user.userAddress,
    joined: new Date(user.createdAt || Date.now()).toISOString().split("T")[0],
  });

  const formatOrder = (order, index) => ({
    id: order.orderID || order._id || index, // Prefer orderID if present
    _id: order._id,
    orderID: order.orderID, // keep for display
    user: order.customerName || "Unknown",
    email: order.customerEmail || "",
    phone: order.customerPhone || "",
    items: order.productsBought || [],
    totalAmount: order.orderTotal || 0,
    orderStatus: order.orderStatus || "pending",
    date: new Date(order.orderDate || Date.now()).toISOString().split("T")[0],
    address: order.deliveryAddress || "N/A",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productCost: "",
    productCategory: "",
    productGender: "Unisex",
    productSize: [],
    productColour: [],
    originalPrice: "",
    productDescription: "",
    productStock: {},
    productDiscount: "",
    exchangePolicy: false,
    displayAt: "none",
    productImages: [],
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/manage/all-categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const resetForm = () => {
    setFormData({
      productName: "",
      productCost: "",
      productCategory: "",
      productGender: "Unisex",
      productSize: [],
      productColour: [],
      originalPrice: "",
      productDescription: "",
      productStock: {},
      productDiscount: "",
      exchangePolicy: false,
      displayAt: "none",
      productImages: [],
    });
    setEditingItem(null);
  };

  const handleAdd = () => {
    setModalType("product");
    setEditingItem(null);
    setFormData({
      productName: "",
      productCost: "",
      productCategory: "",
      productGender: "Unisex",
      productSize: [],
      productColour: [],
      originalPrice: "",
      productDescription: "",
      productStock: {},
      productDiscount: "",
      exchangePolicy: false,
      displayAt: "none",
      productImages: [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        if (type === "product") {
          await axios.delete(`${apiUrl}/manage/delete/${id}`, {
            withCredentials: true
          });

          // Remove from local state
          setProducts(products.filter((p) => p.id !== id));
          alert("Product deleted successfully.");
        }
      } catch (error) {
        console.error("Failed to delete item:", error);
        alert("Failed to delete. Please try again later.");
      }
    }
  };

  const handleOrderDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${apiUrl}/manage/orders/delete/${id}`, {
          withCredentials: true
        });
        setOrders((prev) => prev.filter((o) => o.id !== id));
        alert("Order deleted successfully.");
      } catch (error) {
        console.error("Failed to delete order:", error);
        alert("Failed to delete order. Please try again later.");
      }
    }
  };

  const handleEdit = async (item, type) => {
    setModalType(type);
    setEditingItem(item);

    try {
      const res = await axios.get(`${apiUrl}/manage/displayByID/${item.id}`);
      const data = res.data;

      setFormData({
        productName: data.productName || "",
        productCost: data.productCost || "",
        productCategory: data.productCategory || "",
        productGender: data.productGender || "Unisex",
        productSize: data.productSize || [],
        productColour: data.productColour || [],
        originalPrice: data.originalPrice || "",
        productDescription: data.productDescription || "",
        productStock: data.productStock || {},
        productDiscount: data.productDiscount || "",
        exchangePolicy: data.exchangePolicy || false,
        displayAt: data.displayAt || "none",
        productImages: [],
      });

      setShowModal(true);
    } catch (err) {
      console.error("Failed to load product for editing:", err);
      alert("❌ Failed to load product data.");
    }
  };

  const handleSubmit = async () => {
    if (modalType === "product") {
      try {
        const form = new FormData();

        // Append basic product fields
        form.append("productName", formData.productName);
        form.append("productCost", formData.productCost);
        form.append("productCategory", formData.productCategory); // should be the category _id
        form.append("productGender", formData.productGender);
        form.append("originalPrice", formData.originalPrice || "");
        form.append("productDescription", formData.productDescription || "");
        form.append("productDiscount", formData.productDiscount || 0);
        form.append("isBestseller", formData.isBestseller || false);
        form.append("exchangePolicy", formData.exchangePolicy || false);
        form.append("displayAt", formData.displayAt || "none");

        // Size & color arrays
        (formData.productSize || []).forEach((size) =>
          form.append("productSize", size)
        );
        (formData.productColour || []).forEach((color) =>
          form.append("productColour", color)
        );

        // Append stock as a JSON string
        form.append("productStock", JSON.stringify(formData.productStock)); // stockMap = { S: 5, M: 10 }

        // Append image files
        (formData.productImages || []).forEach((file) => {
          form.append("productImages", file);
        });

        // POST to API
        const url = editingItem
          ? `${apiUrl}/manage/update/${editingItem.id}`
          : `${apiUrl}/manage/addProduct`;

        const method = editingItem ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          body: form,
          credentials: "include"
        });

        const result = await res.json();
        if (result.success) {
          alert("✅ Product added successfully");
          setShowModal(false);

          // Refetch products and map to UI format
          const updated = await fetch(`${apiUrl}/manage/all-products`).then(
            (r) => r.json()
          );
          setProducts(
            Array.isArray(updated)
              ? updated.map((product) => {
                const stock = product.productStock || {};
                let isActive = false;
                for (const color of Object.keys(stock)) {
                  const sizes = stock[color] || {};
                  for (const size of Object.keys(sizes)) {
                    if (Number(sizes[size]) > 0) {
                      isActive = true;
                      break;
                    }
                  }
                  if (isActive) break;
                }
                return {
                  id: product._id,
                  name: product.productName,
                  category: product.productCategory?.name || "",
                  price: product.productCost,
                  stock: stock,
                  image:
                    product.productImages && product.productImages.length > 0
                      ? product.productImages[0]
                      : "",
                  status: isActive ? "active" : "inactive",
                };
              })
              : []
          );
        } else {
          alert(
            "❌ Failed to add product: " + (result.error || "Unknown error")
          );
        }
      } catch (err) {
        console.error("Submit Error:", err);
        alert("❌ Internal error while adding product.");
      }
    }
  };

  const updateOrderStatus = async (orderID, newStatus) => {
    try {
      const res = await axios.post(
        `${apiUrl}/manage/update-order-status`,
        {
          orderID,
          orderStatus: newStatus,
        },
        {
          withCredentials: true
        }
      );

      if (res.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderID ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        alert("Failed to update order status: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      shipped: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const term = (searchTerm || "").toLowerCase();

  const filteredData = {
    products: products.filter(
      (p) =>
        (p.name?.toLowerCase() || "").includes(term) ||
        (p.category?.toLowerCase() || "").includes(term)
    ),
    customers: customers.filter(
      (c) =>
        (c.name?.toLowerCase() || "").includes(term) ||
        (c.email?.toLowerCase() || "").includes(term)
    ),
    orders: orders.filter(
      (o) =>
        (o.user?.toLowerCase() || "").includes(term) ||
        o.items.some((item) =>
          (item.productName?.toLowerCase() || "").includes(term)
        )
    ),
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const TableRow = ({ children }) => (
    <tr className="hover:bg-gray-50">{children}</tr>
  );
  const TableCell = ({ children, className = "" }) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                CMS Dashboard
              </h1>
            </div>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            label="Total Products"
            value={products.length}
            color="text-blue-600"
          />
          <StatCard
            icon={Users}
            label="Total Customers"
            value={customers.length}
            color="text-green-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Orders"
            value={orders.length}
            color="text-purple-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Revenue"
            value={`₹${orders
              .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
              .toFixed(2)}`}
            color="text-orange-600"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["products", "customers", "orders"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Products
                  </h2>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="bg-green-600 text-white mx-4  px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      + Add Category
                    </button>
                    <button
                      onClick={() => handleAdd("product")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Product",
                          "Category",
                          "Price",
                          "Stock",
                          "Status",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={product.image || "/api/placeholder/60/60"}
                                alt={product.name}
                              />
                              <div className="ml-4 text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {product.category}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            ₹{product.price}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {product.stock &&
                              typeof product.stock === "object" &&
                              Object.keys(product.stock).length > 0 ? (
                              <div>
                                {Object.entries(product.stock).map(
                                  ([color, sizes]) => {
                                    // If sizes is a Map (from backend), convert to object
                                    let sizeObj = sizes;
                                    if (sizes instanceof Map) {
                                      sizeObj = Object.fromEntries(sizes);
                                    }
                                    return (
                                      <div key={color}>
                                        <span className="font-semibold">
                                          {color}:
                                        </span>
                                        {Object.entries(sizeObj).map(
                                          ([size, qty]) => (
                                            <span key={size} className="ml-2">
                                              {size}: {qty}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>

                          <TableCell>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                product.status
                              )}`}
                            >
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm font-medium">
                            <button
                              onClick={() => handleEdit(product, "product")}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(product.id, "product")
                              }
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Customers
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Name", "Email", "Phone", "Address"].map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {customer.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Joined {customer.joined}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {customer.email}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {customer.phone}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {customer.address}
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Orders
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Order ID",
                          "Customer",
                          "Phone Number",
                          "Product",
                          "Quantity",
                          "Total",
                          "Status",
                          "Date",
                          "Action"
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-sm font-medium text-gray-900">
                            {order.id}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {order.user}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {order.phone}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {order.items.map((item, idx) => (
                              <div key={idx}>{item.productName}</div>
                            ))}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {order.items.map((item, idx) => (
                              <div key={idx}>{item.quantity}</div>
                            ))}
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            ₹{order.totalAmount}
                          </TableCell>
                          <TableCell>
                            <select
                              value={order.orderStatus}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                updateOrderStatus(order._id, newStatus);
                              }}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(
                                order.orderStatus
                              )}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </TableCell>
                          <TableCell className="text-sm text-gray-900">
                            {order.date}
                          </TableCell>
                          <TableCell>
                            <button onClick={() => handleOrderDelete(order._id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingItem ? "Edit" : "Add"} {modalType === "Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-y-auto px-6 py-4 space-y-6">
              {/* Product Form */}
              {modalType === "product" && (
                <>
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productCategory: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((cat) => (
                          <option
                            key={cat._id}
                            value={cat._id}
                            className="text-black"
                          >
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.productGender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productGender: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Unisex">Unisex</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                  </div>

                  {/* Colours & Stock Table */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Add Colour
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Enter color name"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                          const color = (newColor || "").trim();
                          if (!color || formData.productColour.includes(color))
                            return;
                          setFormData((prev) => ({
                            ...prev,
                            productColour: [...prev.productColour, color],
                            productStock: {
                              ...prev.productStock,
                              [color]: {},
                            },
                          }));
                          setNewColor("");
                        }}
                      >
                        Add Colour
                      </button>
                    </div>
                    {formData.productColour.length === 0 ? (
                      <p className="text-gray-500">No colors added.</p>
                    ) : (
                      <table className="min-w-full border">
                        <thead>
                          <tr>
                            <th className="border px-2">Color</th>
                            <th className="border px-2">Sizes & Stock</th>
                            <th className="border px-2">Add Size</th>
                            <th className="border px-2">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.productColour.map((color) => (
                            <tr key={color}>
                              <td className="border px-2 font-semibold">
                                {color}
                              </td>
                              <td className="border px-2">
                                {formData.productStock[color] &&
                                  Object.keys(formData.productStock[color])
                                    .length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(
                                      formData.productStock[color]
                                    ).map(([size, qty]) => (
                                      <div
                                        key={size}
                                        className="flex items-center gap-1"
                                      >
                                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                          {size}
                                        </span>
                                        <input
                                          type="number"
                                          min="0"
                                          value={qty}
                                          onChange={(e) => {
                                            const newQty = Number(
                                              e.target.value
                                            );
                                            setFormData((prev) => ({
                                              ...prev,
                                              productStock: {
                                                ...prev.productStock,
                                                [color]: {
                                                  ...prev.productStock[color],
                                                  [size]: newQty,
                                                },
                                              },
                                            }));
                                          }}
                                          className="w-16 px-2 py-1 border rounded"
                                        />
                                        <button
                                          type="button"
                                          className="text-red-500 ml-1"
                                          onClick={() => {
                                            const { [size]: _, ...restSizes } =
                                              formData.productStock[color];
                                            setFormData((prev) => ({
                                              ...prev,
                                              productStock: {
                                                ...prev.productStock,
                                                [color]: restSizes,
                                              },
                                            }));
                                          }}
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">
                                    No sizes
                                  </span>
                                )}
                              </td>
                              <td className="border px-2">
                                <div className="flex gap-1">
                                  <input
                                    type="text"
                                    placeholder="Size"
                                    value={newSize[color] || ""}
                                    onChange={(e) =>
                                      setNewSize((prev) => ({
                                        ...prev,
                                        [color]: e.target.value,
                                      }))
                                    }
                                    className="w-16 px-2 py-1 border rounded"
                                  />
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Qty"
                                    value={newQty[color] || ""}
                                    onChange={(e) =>
                                      setNewQty((prev) => ({
                                        ...prev,
                                        [color]: e.target.value,
                                      }))
                                    }
                                    className="w-16 px-2 py-1 border rounded"
                                  />
                                  <button
                                    type="button"
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                      const size = (
                                        newSize[color] || ""
                                      ).trim();
                                      const qty = Number(newQty[color]);
                                      if (!size || isNaN(qty) || qty < 0)
                                        return;
                                      setFormData((prev) => ({
                                        ...prev,
                                        productStock: {
                                          ...prev.productStock,
                                          [color]: {
                                            ...prev.productStock[color],
                                            [size]: qty,
                                          },
                                        },
                                        productSize: prev.productSize.includes(
                                          size
                                        )
                                          ? prev.productSize
                                          : [...prev.productSize, size],
                                      }));
                                      setNewSize((prev) => ({
                                        ...prev,
                                        [color]: "",
                                      }));
                                      setNewQty((prev) => ({
                                        ...prev,
                                        [color]: "",
                                      }));
                                    }}
                                  >
                                    Add
                                  </button>
                                </div>
                              </td>
                              <td className="border px-2">
                                <button
                                  type="button"
                                  className="text-red-600 font-bold"
                                  onClick={() => {
                                    const { [color]: _, ...restStock } =
                                      formData.productStock;
                                    setFormData((prev) => ({
                                      ...prev,
                                      productColour: prev.productColour.filter(
                                        (c) => c !== color
                                      ),
                                      productStock: restStock,
                                    }));
                                  }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Price & MRP */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={formData.productCost}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productCost: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            originalPrice: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={formData.productDiscount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDiscount: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.productDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productDescription: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* DisplayAt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display At
                    </label>
                    <select
                      value={formData.displayAt}
                      onChange={(e) =>
                        setFormData({ ...formData, displayAt: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="none">None</option>
                      <option value="home">Home</option>
                      <option value="trending">Trending</option>
                      <option value="new-arrivals">New Arrivals</option>
                      <option value="sale">Sale</option>
                    </select>
                  </div>

                  {/* Exchange Policy */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.exchangePolicy}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          exchangePolicy: e.target.checked,
                        })
                      }
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Exchange Policy Available
                    </label>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productImages: Array.from(e.target.files),
                        })
                      }
                      className="w-full px-4 py-2"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editingItem ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* category modal */}

      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />

              <select
                value={categoryForm.gender}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="Unisex">Unisex</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSDashboard;
