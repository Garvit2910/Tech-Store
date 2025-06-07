import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ProductCard({ product }) {
  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in the ${product.name} (₹${product.discountedPrice.toLocaleString()}). Can you provide more details?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-secondary-300'}
      />
    ));
  };

  return (
    <div className="card p-4 hover:shadow-md transition-smooth group">
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-secondary-50">
        <Link to="/product-detail-page" className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.availability === 'in-stock' ?'bg-success-100 text-success-700'
              : product.availability === 'limited-stock' ?'bg-warning-100 text-warning-700' :'bg-error-100 text-error-700'
          }`}>
            {product.availability === 'in-stock' ? 'In Stock' : 
             product.availability === 'limited-stock' ? 'Limited' : 'Out of Stock'}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-surface rounded-full shadow-md hover:bg-secondary-50 transition-smooth">
            <Icon name="Heart" size={16} className="text-text-secondary hover:text-error" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Brand */}
        <div className="text-xs text-text-secondary font-medium uppercase tracking-wide">
          {product.brand}
        </div>

        {/* Product Name */}
        <Link to="/product-detail-page" className="block">
          <h3 className="font-medium text-text-primary line-clamp-2 hover:text-primary transition-smooth">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-text-secondary">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Key Specifications */}
        <div className="text-xs text-text-secondary space-y-1">
          {product.specifications.processor && (
            <div className="truncate">{product.specifications.processor}</div>
          )}
          {product.specifications.ram && (
            <div className="truncate">{product.specifications.ram}</div>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-text-primary">
              ₹{product.discountedPrice.toLocaleString()}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-sm text-text-secondary line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-xs text-success-600 font-medium">
              You save ₹{(product.originalPrice - product.discountedPrice).toLocaleString()}
            </div>
          )}
        </div>

        {/* WhatsApp Inquiry Button */}
        <button
          onClick={handleWhatsAppInquiry}
          disabled={product.availability === 'out-of-stock'}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-smooth ${
            product.availability === 'out-of-stock' ?'bg-secondary-100 text-secondary-400 cursor-not-allowed' :'bg-accent text-white hover:bg-accent-600'
          }`}
        >
          <Icon name="MessageCircle" size={14} />
          <span>
            {product.availability === 'out-of-stock' ? 'Out of Stock' : 'Enquiry Now'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;