import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Heart, Star, Grid, List, X } from 'lucide-react';
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

      return matchesSearch && matchesCategory && matchesPrice;
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
  }, [debouncedSearch, selectedCategory, priceRange, sortBy, products]);

  const renderStars = (rating) => (
    [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-black text-black' : 'text-gray-300'}`} />
    ))
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSortBy('featured');
  };

  function FilterSection() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button 
            onClick={clearFilters} 
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Clear All
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
          >
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 w-8">Min</span>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-500 w-12">₹{priceRange[0]}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 w-8">Max</span>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-gray-500 w-12">₹{priceRange[1]}</span>
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
        {/* Search Bar Section - Separate from filters */}
        <div className="bg-white border-b border-gray-200 sticky top-24 z-10">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Mobile Filter Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="md:hidden flex items-center justify-center space-x-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* Sort and View Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:text-black hover:bg-gray-200'
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
        <div className="max-w-full mx-auto px-4 sm:px-6 ">
          <div className="flex">
            {/* Filter Sidebar */}
            <div
              className={`${
                showFilters ? 'block' : 'hidden'
              } md:block w-full md:w-80 bg-white border-r border-gray-200 p-6 md:sticky top-40 md:h-[calc(100vh-8rem)] overflow-y-auto`}
            >
              <div className="md:hidden flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSection />
            </div>

            {/* Products Grid */}
            <div className="flex-1 p-6">
              {/* Results Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {filteredProducts.length} Products
                    </h2>
                    {selectedCategory !== 'all' && (
                      <p className="text-gray-600 mt-1">
                        in {categories.find(c => c._id === selectedCategory)?.name || ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2' 
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    onClick={() => handleClick(product)}
                    className={`cursor-pointer group ${
                      viewMode === 'grid' 
                        ? 'bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300' 
                        : 'flex bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        <div className="relative overflow-hidden">
                          <img 
                            src={product.productImages?.[0]} 
                            alt={product.productName} 
                            className="w-full h-96 object-auto group-hover:scale-105 transition-transform duration-300" 
                          />
                        
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {product.productName}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3">
                            {product.productCategory?.name}
                          </p>
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{product.productCost}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(product);
                            }}
                            className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.productImages?.[0]} 
                            alt={product.productName} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                          <div className="absolute top-3 right-3">
                            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              {product.productName}
                            </h3>
                            <p className="text-gray-500 text-sm mb-3">
                              {product.productCategory?.name}
                            </p>
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-xl font-bold text-gray-900">
                                ₹{product.productCost}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(product);
                            }}
                            className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium self-start"
                          >
                            View Details
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* No Products Found */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <button 
                      onClick={clearFilters} 
                      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;