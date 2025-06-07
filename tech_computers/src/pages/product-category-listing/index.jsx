import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomerHeader from 'components/ui/CustomerHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Icon from 'components/AppIcon';

import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import FilterChips from './components/FilterChips';

function ProductCategoryListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 200000],
    brands: [],
    availability: 'all',
    rating: 0
  });
  
  const [sortBy, setSortBy] = useState('popularity');
  const productsPerPage = 12;

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Gaming Laptop ASUS ROG Strix G15",
      category: "laptops",
      brand: "ASUS",
      originalPrice: 89999,
      discountedPrice: 74999,
      discountPercentage: 17,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      images: [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
      ],
      specifications: {
        processor: "AMD Ryzen 7 5800H",
        ram: "16GB DDR4",
        storage: "512GB SSD",
        graphics: "NVIDIA RTX 3060"
      },
      rating: 4.5,
      reviews: 128,
      availability: "in-stock",
      isNew: true
    },
    {
      id: 2,
      name: "Dell XPS 13 Ultrabook",
      category: "laptops",
      brand: "Dell",
      originalPrice: 94999,
      discountedPrice: 84999,
      discountPercentage: 11,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
      ],
      specifications: {
        processor: "Intel Core i7-1165G7",
        ram: "16GB LPDDR4x",
        storage: "512GB SSD",
        graphics: "Intel Iris Xe"
      },
      rating: 4.7,
      reviews: 89,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 3,
      name: "HP Pavilion Gaming Desktop",
      category: "desktops",
      brand: "HP",
      originalPrice: 65999,
      discountedPrice: 54999,
      discountPercentage: 17,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
      images: [
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400"
      ],
      specifications: {
        processor: "Intel Core i5-10400F",
        ram: "8GB DDR4",
        storage: "256GB SSD + 1TB HDD",
        graphics: "NVIDIA GTX 1650"
      },
      rating: 4.3,
      reviews: 156,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 4,
      name: "LG UltraWide 34-inch Monitor",
      category: "monitors",
      brand: "LG",
      originalPrice: 45999,
      discountedPrice: 38999,
      discountPercentage: 15,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400"
      ],
      specifications: {
        size: "34-inch",
        resolution: "3440x1440",
        refreshRate: "144Hz",
        panelType: "IPS"
      },
      rating: 4.6,
      reviews: 203,
      availability: "in-stock",
      isNew: true
    },
    {
      id: 5,
      name: "Logitech MX Master 3 Mouse",
      category: "accessories",
      brand: "Logitech",
      originalPrice: 8999,
      discountedPrice: 7499,
      discountPercentage: 17,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400"
      ],
      specifications: {
        connectivity: "Wireless",
        battery: "70 days",
        dpi: "4000 DPI",
        buttons: "7 buttons"
      },
      rating: 4.8,
      reviews: 445,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 6,
      name: "MacBook Pro 14-inch M2",
      category: "laptops",
      brand: "Apple",
      originalPrice: 199900,
      discountedPrice: 189900,
      discountPercentage: 5,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
      ],
      specifications: {
        processor: "Apple M2 Pro",
        ram: "16GB Unified Memory",
        storage: "512GB SSD",
        graphics: "10-core GPU"
      },
      rating: 4.9,
      reviews: 67,
      availability: "limited-stock",
      isNew: true
    },
    {
      id: 7,
      name: "Custom Gaming PC Build",
      category: "desktops",
      brand: "Custom",
      originalPrice: 125999,
      discountedPrice: 109999,
      discountPercentage: 13,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400",
      images: [
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400",
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400"
      ],
      specifications: {
        processor: "AMD Ryzen 9 5900X",
        ram: "32GB DDR4",
        storage: "1TB NVMe SSD",
        graphics: "NVIDIA RTX 4070"
      },
      rating: 4.7,
      reviews: 89,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 8,
      name: "Samsung 27-inch 4K Monitor",
      category: "monitors",
      brand: "Samsung",
      originalPrice: 32999,
      discountedPrice: 27999,
      discountPercentage: 15,
      image: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400",
      images: [
        "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400"
      ],
      specifications: {
        size: "27-inch",
        resolution: "3840x2160",
        refreshRate: "60Hz",
        panelType: "VA"
      },
      rating: 4.4,
      reviews: 178,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 9,
      name: "Mechanical Gaming Keyboard",
      category: "accessories",
      brand: "Corsair",
      originalPrice: 12999,
      discountedPrice: 9999,
      discountPercentage: 23,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      images: [
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
      ],
      specifications: {
        switches: "Cherry MX Red",
        backlight: "RGB",
        connectivity: "USB-C",
        layout: "Full Size"
      },
      rating: 4.6,
      reviews: 234,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 10,
      name: "Lenovo ThinkPad X1 Carbon",
      category: "laptops",
      brand: "Lenovo",
      originalPrice: 134999,
      discountedPrice: 119999,
      discountPercentage: 11,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
      ],
      specifications: {
        processor: "Intel Core i7-1260P",
        ram: "16GB LPDDR5",
        storage: "512GB SSD",
        graphics: "Intel Iris Xe"
      },
      rating: 4.5,
      reviews: 92,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 11,
      name: "All-in-One Desktop PC",
      category: "desktops",
      brand: "HP",
      originalPrice: 78999,
      discountedPrice: 69999,
      discountPercentage: 11,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
      images: [
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400"
      ],
      specifications: {
        processor: "Intel Core i5-1135G7",
        ram: "8GB DDR4",
        storage: "256GB SSD",
        display: "23.8-inch FHD"
      },
      rating: 4.2,
      reviews: 145,
      availability: "in-stock",
      isNew: false
    },
    {
      id: 12,
      name: "ASUS ProArt 32-inch Monitor",
      category: "monitors",
      brand: "ASUS",
      originalPrice: 89999,
      discountedPrice: 79999,
      discountPercentage: 11,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400"
      ],
      specifications: {
        size: "32-inch",
        resolution: "3840x2160",
        refreshRate: "60Hz",
        panelType: "IPS"
      },
      rating: 4.7,
      reviews: 156,
      availability: "limited-stock",
      isNew: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: mockProducts.length },
    { id: 'laptops', name: 'Laptops', count: mockProducts.filter(p => p.category === 'laptops').length },
    { id: 'desktops', name: 'Desktops', count: mockProducts.filter(p => p.category === 'desktops').length },
    { id: 'monitors', name: 'Monitors', count: mockProducts.filter(p => p.category === 'monitors').length },
    { id: 'accessories', name: 'Accessories', count: mockProducts.filter(p => p.category === 'accessories').length }
  ];

  const brands = ['ASUS', 'Dell', 'HP', 'Apple', 'Lenovo', 'Samsung', 'LG', 'Corsair', 'Logitech', 'Custom'];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.discountedPrice >= filters.priceRange[0] && 
      product.discountedPrice <= filters.priceRange[1]
    );

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Availability filter
    if (filters.availability !== 'all') {
      filtered = filtered.filter(product => product.availability === filters.availability);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.discountedPrice - b.discountedPrice;
        case 'price-high':
          return b.discountedPrice - a.discountedPrice;
        case 'newest':
          return b.isNew - a.isNew;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.reviews - a.reviews;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 200000],
      brands: [],
      availability: 'all',
      rating: 0
    });
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.brands.length > 0) count++;
    if (filters.availability !== 'all') count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++;
    return count;
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(0, endIndex);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
    setHasMore(getCurrentPageProducts().length < filteredProducts.length);
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/product-catalog-homepage', icon: 'Home' },
    { name: 'Categories', path: '/product-category-listing', icon: 'Grid3X3', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs customItems={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Product Categories</h1>
          <p className="text-text-secondary">
            Discover our complete range of computers, laptops, and accessories
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 border-b border-border">
          <div className="flex space-x-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange({ ...filters, category: category.id })}
                className={`flex-shrink-0 pb-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                  filters.category === category.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }`}
              >
                {category.name}
                <span className="ml-2 bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              brands={brands}
              priceRange={[0, 200000]}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-smooth"
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
                
                <div className="text-sm text-text-secondary">
                  {filteredProducts.length} products found
                </div>
              </div>

              <SortDropdown value={sortBy} onChange={handleSortChange} />
            </div>

            {/* Active Filters */}
            <FilterChips
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              brands={brands}
            />

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="card p-4 animate-pulse">
                    <div className="aspect-square bg-secondary-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                    <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Package" size={48} className="text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No products found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-smooth"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {getCurrentPageProducts().map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More */}
                {getCurrentPageProducts().length < filteredProducts.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMore}
                      className="bg-surface border border-border text-text-primary px-8 py-3 rounded-lg hover:bg-secondary-50 transition-smooth flex items-center space-x-2 mx-auto"
                    >
                      <Icon name="Plus" size={16} />
                      <span>Load More Products</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                brands={brands}
                priceRange={[0, 200000]}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCategoryListing;