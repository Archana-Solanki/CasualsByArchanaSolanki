import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Search, Filter, Heart, Star, Grid, List, X, ChevronDown } from 'lucide-react';
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Dual range slider states
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  const min = 0;
  const max = 5000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${apiUrl}/manage/all-products`),
          axios.get(`${apiUrl}/manage/all-categories`)
        ]);

        if (Array.isArray(productRes.data)) {
          setProducts(productRes.data);
        } else {
          console.error("Expected an array for products but got:", productRes.data);
        }

        if (Array.isArray(categoryRes.data)) {
          setCategories([{ _id: 'all', name: 'All Categories' }, ...categoryRes.data]);
        } else {
          console.error("Expected an array for categories but got:", categoryRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  // Debounce searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Dual range slider functions
  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging === null || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = Math.round((percentage / 100) * (max - min) + min);

    setPriceRange(prev => {
      const newRange = [...prev];

      if (isDragging === 0) {
        newRange[0] = Math.min(value, prev[1] - 100); // Ensure min gap of 100
      } else {
        newRange[1] = Math.max(value, prev[0] + 100); // Ensure min gap of 100
      }

      return newRange;
    });
  }, [isDragging, min, max]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const slugify = (str) => str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const handleClick = (product) => {
    navigate(`/product/${slugify(product.productName)}`, {
      state: { productId: product._id }
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.productName?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.productCategory?._id === selectedCategory;
      const matchesPrice =
        product.productCost >= priceRange[0] && product.productCost <= priceRange[1];
      const matchesGender =
        selectedGender === 'all' || product.productGender === selectedGender;

      return matchesSearch && matchesCategory && matchesPrice && matchesGender;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.productCost - b.productCost);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.productCost - a.productCost);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [debouncedSearch, selectedCategory, priceRange, sortBy, products, selectedGender]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedGender('all');
    setPriceRange([0, 5000]);
    setSortBy('featured');
  };

  function FilterSection() {
    const leftPercentage = getPercentage(priceRange[0]);
    const rightPercentage = getPercentage(priceRange[1]);

    return (
      <div className="sticky space-y-6">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-black transition-colors duration-200"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white appearance-none transition-all duration-200 hover:border-gray-300"
            >
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="relative">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white appearance-none transition-all duration-200 hover:border-gray-300"
            >
              <option value="all">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Dual Range Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Price Range</label>
            <span className="text-sm font-semibold text-gray-900">
              ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </span>
          </div>

          <div className="relative">
            <div
              ref={sliderRef}
              className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
            >
              <div
                className="absolute h-2 bg-black rounded-full transition-all duration-150"
                style={{
                  left: `${leftPercentage}%`,
                  width: `${rightPercentage - leftPercentage}%`
                }}
              />

              <div
                className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab transform -translate-y-1.5 -translate-x-2.5 transition-all duration-150 hover:scale-110 shadow-lg ${isDragging === 0 ? 'scale-125 cursor-grabbing' : ''
                  }`}
                style={{ left: `${leftPercentage}%` }}
                onMouseDown={handleMouseDown(0)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  ₹{priceRange[0]}
                </div>
              </div>

              <div
                className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab transform -translate-y-1.5 -translate-x-2.5 transition-all duration-150 hover:scale-110 shadow-lg ${isDragging === 1 ? 'scale-125 cursor-grabbing' : ''
                  }`}
                style={{ left: `${rightPercentage}%` }}
                onMouseDown={handleMouseDown(1)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  ₹{priceRange[1]}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>₹{min}</span>
              <span>₹{max.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <input
                type="number"
                min={min}
                max={priceRange[1] - 100}
                value={priceRange[0]}
                onChange={(e) => {
                  const value = Math.max(min, Math.min(parseInt(e.target.value) || min, priceRange[1] - 100));
                  setPriceRange([value, priceRange[1]]);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <input
                type="number"
                min={priceRange[0] + 100}
                max={max}
                value={priceRange[1]}
                onChange={(e) => {
                  const value = Math.min(max, Math.max(parseInt(e.target.value) || max, priceRange[0] + 100));
                  setPriceRange([priceRange[0], value]);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 mt-24">
        {/* Header with Search */}
        <div className="bg-white border-b border-gray-200 sticky top-24 z-20 shadow-sm">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-300"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between lg:justify-end gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {/* {showFilters && <span className="ml-1 text-xs bg-white text-black rounded-full px-2">ON</span>} */}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 hidden sm:inline">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white appearance-none text-sm transition-all duration-200 hover:border-gray-300"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-gray-500 hover:text-black'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-gray-500 hover:text-black'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-full mx-auto">
          <div className="flex relative">
            {/* Filter Sidebar */}
            <aside
              className={`${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } sticky lg:sticky top-[2500px] left-0 w-72 lg:w-80 h-[calc(100vh-90px)] bg-white border-r border-gray-200 p-6 overflow-y-auto transition-transform duration-300 z-10 lg:z-0`}
            >
              <div className="lg:hidden flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSection />
            </aside>

            {/* Overlay for mobile */}
            {showFilters && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[5]"
                onClick={() => setShowFilters(false)}
              />
            )}

            {/* Products Grid */}
            <main className="flex-1 p-4 lg:p-6">
              {/* Results Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </h2>
                {selectedCategory !== 'all' && (
                  <p className="text-gray-600 mt-1">
                    in {categories.find(c => c._id === selectedCategory)?.name || ''}
                  </p>
                )}
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      onClick={() => handleClick(product)}
                      className={`cursor-pointer group ${viewMode === 'grid'
                          ? 'bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300'
                          : 'flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300'
                        }`}
                    >
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative aspect-square overflow-hidden bg-gray-50">
                            <img
                              src={product.productImages?.[0]}
                              alt={product.productName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.originalPrice && (
                              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                                {Math.round(((product.originalPrice - product.productCost) / product.originalPrice) * 100)}% OFF
                              </div>
                            )}
                          </div>
                          <div className="p-4 lg:p-5">
                            <h3 className="font-semibold text-base lg:text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-black transition-colors">
                              {product.productName}
                            </h3>
                            <p className="text-gray-500 text-sm mb-3">
                              {product.productCategory?.name}
                            </p>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xl font-bold text-gray-900">
                                ₹{product.productCost.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClick(product);
                              }}
                              className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
                            >
                              View Details
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative w-32 sm:w-48 flex-shrink-0 overflow-hidden bg-gray-50">
                            <img
                              src={product.productImages?.[0]}
                              alt={product.productName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.originalPrice && (
                              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                                {Math.round(((product.originalPrice - product.productCost) / product.originalPrice) * 100)}% OFF
                              </div>
                            )}
                          </div>
                          <div className="p-4 lg:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-semibold text-base lg:text-lg text-gray-900 mb-1 group-hover:text-black transition-colors">
                                {product.productName}
                              </h3>
                              <p className="text-gray-500 text-sm mb-3">
                                {product.productCategory?.name}
                              </p>
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-bold text-gray-900">
                                  ₹{product.productCost.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClick(product);
                              }}
                              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium self-start text-sm"
                            >
                              View Details
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;