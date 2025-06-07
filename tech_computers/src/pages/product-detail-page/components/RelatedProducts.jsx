import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function RelatedProducts({ products, currentProductId, category }) {
  const relatedProducts = products.filter(product => product.id !== currentProductId);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={12} className="text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-secondary-300" />);
    }

    return stars;
  };

  const handleWhatsAppInquiry = (product) => {
    const message = `Hi! I'm interested in the ${product.name} priced at ₹${product.discountedPrice.toLocaleString()}. Could you please provide more details?`;
    const phoneNumber = '+919876543210'; // Mock phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-primary flex items-center">
          <Icon name="Package" size={24} className="mr-2" />
          Related Products
        </h2>
        <Link
          to={`/product-category-listing?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-primary hover:text-primary-700 text-sm font-medium flex items-center transition-smooth"
        >
          View All
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Link to={`/product-detail-page?id=${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs font-medium">
                    {product.discountPercentage}% OFF
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-secondary-50 transition-smooth mb-2">
                    <Icon name="Heart" size={16} className="text-secondary-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product-detail-page?id=${product.id}`}>
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 hover:text-primary transition-smooth">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-xs text-text-secondary ml-1">({product.rating})</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-text-primary">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  {product.originalPrice > product.discountedPrice && (
                    <span className="text-sm text-secondary-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={() => handleWhatsAppInquiry(product)}
                  className="w-full bg-accent text-white py-2 rounded-md text-sm font-medium hover:bg-accent-600 transition-smooth flex items-center justify-center space-x-1"
                >
                  <Icon name="MessageCircle" size={14} />
                  <span>Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Link to={`/product-detail-page?id=${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded text-xs font-medium">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product-detail-page?id=${product.id}`}>
                    <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-text-secondary ml-1">({product.rating})</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-text-primary">
                      ₹{product.discountedPrice.toLocaleString()}
                    </span>
                    {product.originalPrice > product.discountedPrice && (
                      <span className="text-sm text-secondary-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsAppInquiry(product)}
                    className="w-full bg-accent text-white py-2 rounded-md text-sm font-medium hover:bg-accent-600 transition-smooth flex items-center justify-center space-x-1"
                  >
                    <Icon name="MessageCircle" size={14} />
                    <span>Enquiry</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button for Mobile */}
      <div className="md:hidden mt-4 text-center">
        <Link
          to={`/product-category-listing?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center px-6 py-2 border border-border rounded-lg text-text-primary hover:bg-secondary-50 transition-smooth"
        >
          View All {category}
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default RelatedProducts;