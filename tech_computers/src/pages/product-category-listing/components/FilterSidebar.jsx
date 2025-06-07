import React, { useState } from 'react';
import Icon from 'components/AppIcon';

function FilterSidebar({ filters, onFilterChange, brands, priceRange, onClose }) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value) || 0;
    setLocalPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onFilterChange({ ...filters, priceRange: localPriceRange });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleAvailabilityChange = (availability) => {
    onFilterChange({ ...filters, availability });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-secondary-300'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="DollarSign" size={16} />
          <span>Price Range</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, e.target.value)}
              className="flex-1 input-field text-sm"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              placeholder="Max"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, e.target.value)}
              className="flex-1 input-field text-sm"
            />
          </div>
          
          <button
            onClick={applyPriceRange}
            className="w-full bg-primary text-white py-2 px-3 rounded-md text-sm hover:bg-primary-700 transition-smooth"
          >
            Apply
          </button>
        </div>

        {/* Quick Price Filters */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Under ₹25K', range: [0, 25000] },
            { label: '₹25K - ₹50K', range: [25000, 50000] },
            { label: '₹50K - ₹1L', range: [50000, 100000] },
            { label: 'Above ₹1L', range: [100000, 200000] }
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => onFilterChange({ ...filters, priceRange: option.range })}
              className={`text-xs py-2 px-3 rounded-md border transition-smooth ${
                filters.priceRange[0] === option.range[0] && filters.priceRange[1] === option.range[1]
                  ? 'bg-primary text-white border-primary' :'bg-surface border-border hover:border-primary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Tag" size={16} />
          <span>Brands</span>
        </h3>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4">
        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Package" size={16} />
          <span>Availability</span>
        </h3>
        
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Products' },
            { value: 'in-stock', label: 'In Stock' },
            { value: 'limited-stock', label: 'Limited Stock' },
            { value: 'out-of-stock', label: 'Out of Stock' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={filters.availability === option.value}
                onChange={(e) => handleAvailabilityChange(e.target.value)}
                className="border-border text-primary focus:ring-primary-500"
              />
              <span className="text-sm text-text-primary">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <h3 className="font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Star" size={16} />
          <span>Customer Rating</span>
        </h3>
        
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => handleRatingChange(parseInt(e.target.value))}
                className="border-border text-primary focus:ring-primary-500"
              />
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
                <span className="text-sm text-text-secondary ml-1">& above</span>
              </div>
            </label>
          ))}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={0}
              checked={filters.rating === 0}
              onChange={(e) => handleRatingChange(parseInt(e.target.value))}
              className="border-border text-primary focus:ring-primary-500"
            />
            <span className="text-sm text-text-primary">All Ratings</span>
          </label>
        </div>
      </div>

      {/* Mobile Close Button */}
      {onClose && (
        <div className="pt-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-smooth"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterSidebar;