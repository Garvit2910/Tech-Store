import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function FeaturedProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const featuredProducts = [
    {
      id: 1,
      name: "ASUS ROG Strix G15 Gaming Laptop",
      category: "Laptops",
      originalPrice: 89999,
      discountedPrice: 74999,
      discountPercentage: 17,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.5,
      reviews: 128,
      specs: ["AMD Ryzen 7", "16GB RAM", "RTX 3060", "512GB SSD"]
    },
    {
      id: 2,
      name: "Dell XPS 13 Ultrabook",
      category: "Laptops",
      originalPrice: 79999,
      discountedPrice: 69999,
      discountPercentage: 13,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.7,
      reviews: 89,
      specs: ["Intel i7", "16GB RAM", "Intel Iris", "1TB SSD"]
    },
    {
      id: 3,
      name: "Custom Gaming PC - RTX 4070",
      category: "Desktop PCs",
      originalPrice: 124999,
      discountedPrice: 109999,
      discountPercentage: 12,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.8,
      reviews: 45,
      specs: ["Intel i7-13700K", "32GB RAM", "RTX 4070", "1TB NVMe"]
    },
    {
      id: 4,
      name: "LG 27\" 4K Gaming Monitor",
      category: "Monitors",
      originalPrice: 34999,
      discountedPrice: 29999,
      discountPercentage: 14,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.6,
      reviews: 67,
      specs: ["4K UHD", "144Hz", "1ms", "HDR10"]
    },
    {
      id: 5,
      name: "Logitech MX Master 3S Mouse",
      category: "Accessories",
      originalPrice: 8999,
      discountedPrice: 7499,
      discountPercentage: 17,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.9,
      reviews: 234,
      specs: ["Wireless", "4000 DPI", "USB-C", "Multi-device"]
    },
    {
      id: 6,
      name: "Corsair K95 RGB Mechanical Keyboard",
      category: "Accessories",
      originalPrice: 18999,
      discountedPrice: 15999,
      discountPercentage: 16,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.7,
      reviews: 156,
      specs: ["Cherry MX", "RGB Backlit", "Aluminum", "Macro Keys"]
    },
    {
      id: 7,
      name: "HP Pavilion All-in-One PC",
      category: "Desktop PCs",
      originalPrice: 54999,
      discountedPrice: 47999,
      discountPercentage: 13,
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=300&fit=crop",
      availability: "Limited Stock",
      rating: 4.4,
      reviews: 78,
      specs: ["Intel i5", "8GB RAM", "Intel UHD", "256GB SSD"]
    },
    {
      id: 8,
      name: "Samsung 32\" Curved Monitor",
      category: "Monitors",
      originalPrice: 28999,
      discountedPrice: 24999,
      discountPercentage: 14,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.5,
      reviews: 92,
      specs: ["QHD", "75Hz", "Curved", "FreeSync"]
    },
    {
      id: 9,
      name: "MacBook Pro 14\" M3",
      category: "Laptops",
      originalPrice: 199999,
      discountedPrice: 189999,
      discountPercentage: 5,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.9,
      reviews: 167,
      specs: ["Apple M3", "16GB RAM", "M3 Pro GPU", "512GB SSD"]
    },
    {
      id: 10,
      name: "Razer DeathAdder V3 Gaming Mouse",
      category: "Accessories",
      originalPrice: 6999,
      discountedPrice: 5999,
      discountPercentage: 14,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop",
      availability: "In Stock",
      rating: 4.6,
      reviews: 189,
      specs: ["30K DPI", "Wireless", "90hr Battery", "Ergonomic"]
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppInquiry = (product) => {
    const message = `Hi! I'm interested in the ${product.name} (₹${product.discountedPrice.toLocaleString()}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => Math.min(prev + 4, featuredProducts.length));
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Featured Products</h2>
          <p className="text-text-secondary">Handpicked products with the best deals</p>
        </div>
        <Link
          to="/product-category-listing"
          className="hidden sm:flex items-center text-primary hover:text-primary-700 transition-smooth font-medium"
        >
          View All Products
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="bg-surface rounded-xl border border-border hover:border-primary-200 transition-all duration-300 hover:shadow-lg overflow-hidden group"
          >
            <div className="relative">
              <Link to={`/product-detail-page?id=${product.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-error text-white px-2 py-1 rounded-md text-xs font-semibold">
                      -{product.discountPercentage}%
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-smooth">
                      <Icon name="Heart" size={16} className="text-text-secondary hover:text-error" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-text-secondary bg-secondary-50 px-2 py-1 rounded-md">
                  {product.category}
                </span>
              </div>

              <Link to={`/product-detail-page?id=${product.id}`}>
                <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 hover:text-primary transition-smooth">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={`${i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-secondary-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary ml-1">({product.reviews})</span>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-text-primary">
                    {formatPrice(product.discountedPrice)}
                  </span>
                  <span className="text-sm text-text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {product.specs.slice(0, 2).map((spec, index) => (
                    <span key={index} className="text-xs text-text-secondary bg-secondary-50 px-2 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium ${
                  product.availability === 'In Stock' ? 'text-success' : 'text-warning'
                }`}>
                  <Icon 
                    name={product.availability === 'In Stock' ? 'CheckCircle' : 'Clock'} 
                    size={12} 
                    className="inline mr-1" 
                  />
                  {product.availability}
                </span>
              </div>

              <button
                onClick={() => handleWhatsAppInquiry(product)}
                className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-600 transition-smooth font-medium text-sm flex items-center justify-center"
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Enquiry Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts < featuredProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreProducts}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-medium"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Load More Products
          </button>
        </div>
      )}

      <div className="sm:hidden mt-6 text-center">
        <Link
          to="/product-category-listing"
          className="inline-flex items-center text-primary hover:text-primary-700 transition-smooth font-medium"
        >
          View All Products
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;