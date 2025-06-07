import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function ProductInfo({ product, selectedVariant, onVariantChange, onWhatsAppInquiry }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = product.variants[selectedVariant];
  const discountAmount = currentVariant.originalPrice - currentVariant.price;
  const discountPercentage = Math.round((discountAmount / currentVariant.originalPrice) * 100);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={16} className="text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-secondary-300" />);
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            {product.name}
          </h1>
          <p className="text-text-secondary">{product.shortDescription}</p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full border transition-smooth ${
              isFavorite
                ? 'bg-red-50 border-red-200 text-red-600' :'bg-secondary-50 border-border text-secondary-600 hover:text-red-600'
            }`}
          >
            <Icon name="Heart" size={20} className={isFavorite ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-secondary-50 border border-border text-secondary-600 hover:text-text-primary transition-smooth"
          >
            <Icon name="Share2" size={20} />
          </button>
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-sm font-medium text-text-primary ml-1">
            {product.rating}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product.reviewCount} reviews)
        </span>
        <span className="text-sm text-accent font-medium">
          {product.availability}
        </span>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-text-primary">
            ₹{currentVariant.price.toLocaleString()}
          </span>
          <span className="text-xl text-secondary-500 line-through">
            ₹{currentVariant.originalPrice.toLocaleString()}
          </span>
          <span className="bg-accent text-white px-2 py-1 rounded text-sm font-medium">
            {discountPercentage}% OFF
          </span>
        </div>
        <p className="text-sm text-accent font-medium">
          You save ₹{discountAmount.toLocaleString()}
        </p>
      </div>

      {/* Variant Selection */}
      {product.variants.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">Configuration</h3>
          <div className="space-y-2">
            {product.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => onVariantChange(index)}
                className={`w-full p-3 rounded-lg border text-left transition-smooth ${
                  selectedVariant === index
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{variant.name}</span>
                  <span className="font-bold">₹{variant.price.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Key Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-accent flex-shrink-0" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2 p-3 bg-accent-50 rounded-lg">
        <Icon name="Package" size={20} className="text-accent" />
        <span className="text-sm font-medium text-accent">
          {product.stockCount} units available
        </span>
      </div>

      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-text-primary">Quantity:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-secondary-50 transition-smooth"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 border-x border-border min-w-16 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
              className="p-2 hover:bg-secondary-50 transition-smooth"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        {/* WhatsApp Inquiry Button */}
        <button
          onClick={onWhatsAppInquiry}
          className="w-full bg-accent text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-smooth flex items-center justify-center space-x-2"
        >
          <Icon name="MessageCircle" size={24} />
          <span>Enquiry Now on WhatsApp</span>
        </button>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 py-3 border border-border rounded-lg hover:bg-secondary-50 transition-smooth">
            <Icon name="Phone" size={18} />
            <span>Call Now</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-3 border border-border rounded-lg hover:bg-secondary-50 transition-smooth">
            <Icon name="MapPin" size={18} />
            <span>Visit Store</span>
          </button>
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-text-primary">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;