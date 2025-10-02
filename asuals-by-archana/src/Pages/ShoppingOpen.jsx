import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Truck,
  Shield,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import { useCartActions } from "../Helper/CartHelper";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const { id: fullId } = useParams();
  const id = fullId?.split("-")[0];
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addToCart, updateCartItem, fetchCart } = useCartActions();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const res = await axios.get(`${apiUrl}/cart`, { withCredentials: true });
      setCartData(res.data);

      fetchCart();
    };

    loadCart();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile`, { withCredentials: true });
        if (res.status === 200)
          setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const ProductId = location.state?.productId || id;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (ProductId) {
          const res = await axios.get(
            `${apiUrl}/manage/displayByID/${ProductId}`
          );
          setProduct(res.data);
          setSelectedSize(res.data.productSize?.[0] || "");
        } else {
          console.warn("ProductId is not passed and id is not available");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [ProductId]);

  function isAnyStockAvailable() {
    if (!product || !product.productStock) return false;

    return Object.values(product.productStock).some(colorSizes =>
      Object.values(colorSizes).some(qty => Number(qty) > 0)
    );
  }


  const isSizeOutOfStock = (color, size, qty = 1) => {
    if (!product || !product.productStock) return false;
    const stock = product.productStock?.[color] || {};
    return Number(stock[size] || 0) <= qty;
  };


  const nextImage = () => {
    setCurrentImage(
      (prev) => (prev + 1) % (product?.productImages?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        (prev - 1 + (product?.productImages?.length || 1)) %
        (product?.productImages?.length || 1)
    );
  };

  if (!product)
    return <div className="text-center p-10">Loading product...</div>;

  const productImages =
    product.productImages?.length > 0
      ? product.productImages
      : ["https://via.placeholder.com/500x700?text=No+Image"];

  const HandleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (isSizeOutOfStock(selectedColor, selectedSize, quantity)) {
      alert("Selected size is out of stock.");
      return;
    }
    const existingItem = cartData.find(
      (cartItem) =>
        cartItem.id === product._id && cartItem.size === selectedSize && cartItem.color === selectedColor
    );
    if (existingItem) {
      await updateCartItem(product._id, quantity, selectedColor, selectedSize)
      alert("🛒 Cart updated!\n\nWe've adjusted the quantity for this item.");
    } else {
      await addToCart({
        productID: product._id,
        productQuantity: quantity,
        productColor: selectedColor,
        productSize: selectedSize
      })
      alert("🎉 Added to Cart!\n\nYour item has been successfully added.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-h-[650px] bg-white relative top-24">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Images */}
          <div className="lg:w-1/2 lg:h-[680px] lg:sticky lg:top-0 bg-gray-50 pt-4 border-">
            <div className="relative h-96 lg:h-full">
              <div className="relative h-full overflow-hidden">
                <img
                  src={productImages[currentImage]}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImage + 1} / {productImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 right-4 space-y-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`block w-16 h-16 rounded-lg overflow-hidden border-2 ${currentImage === index
                      ? "border-black"
                      : "border-transparent"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:w-1/2 lg:h-[700px] lg:overflow-y-auto">
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
                  {product.productName}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-2xl font-bold text-black">
                    ₹{product.productCost}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.productDiscount > 0 && (
                    <span className="bg-black text-white px-2 py-1 text-sm rounded">
                      {product.productDiscount}% OFF
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  {/* <div className="flex">{renderStars(4)}</div>
                  <span className="text-sm text-gray-600">
                    ({product.customerReviews?.length || 0} reviews)
                  </span> */}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {product.productDescription}
                </p>
              </div>

              {/* Color & Size (new schema) */}
              {product.productColour && product.productColour.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.productColour.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          // Set default size for selected color
                          const sizes = Object.keys(product.productStock?.[color] || {});
                          setSelectedSize(sizes[0] || "");
                        }}
                        className={`min-w-[3rem] px-3 py-2 border-2 rounded-lg text-sm capitalize transition-all
            ${selectedColor === color
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedColor && Object.keys(product.productStock?.[selectedColor] || {}).map((size) => {
                    const outOfStock = isSizeOutOfStock(selectedColor, size, quantity);
                    return (
                      <button
                        key={size}
                        onClick={() => !outOfStock && setSelectedSize(size)}
                        className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center font-medium transition-all
                          ${selectedSize === size
                            ? "border-black bg-black text-white"
                            : outOfStock
                              ? "border-gray-300 text-gray-400 cursor-not-allowed"
                              : "border-gray-300 hover:border-gray-400"
                          }
                        `}
                        disabled={outOfStock}
                        title={outOfStock ? "Out of stock" : `Available`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 p-4 rounded-lg">
                {(!selectedColor || !selectedSize
                  ? isAnyStockAvailable()
                  : !isSizeOutOfStock(selectedColor, selectedSize, quantity)
                ) ? (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-green-600">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-red-600">Out of Stock</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Delivery within 2 days
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    No returns available — size exchange only
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={HandleAddToCart}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
