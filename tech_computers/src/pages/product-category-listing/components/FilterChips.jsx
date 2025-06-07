import React from 'react';
import Icon from 'components/AppIcon';

function FilterChips({ filters, onFilterChange, onClearAll, brands }) {
  const activeFilters = [];

  // Category filter
  if (filters.category !== 'all') {
    activeFilters.push({
      type: 'category',
      label: `Category: ${filters.category}`,
      onRemove: () => onFilterChange({ ...filters, category: 'all' })
    });
  }

  // Price range filter
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) {
    activeFilters.push({
      type: 'price',
      label: `₹${filters.priceRange[0].toLocaleString()} - ₹${filters.priceRange[1].toLocaleString()}`,
      onRemove: () => onFilterChange({ ...filters, priceRange: [0, 200000] })
    });
  }

  // Brand filters
  filters.brands.forEach(brand => {
    activeFilters.push({
      type: 'brand',
      label: brand,
      onRemove: () => onFilterChange({
        ...filters,
        brands: filters.brands.filter(b => b !== brand)
      })
    });
  });

  // Availability filter
  if (filters.availability !== 'all') {
    const availabilityLabels = {
      'in-stock': 'In Stock',
      'limited-stock': 'Limited Stock',
      'out-of-stock': 'Out of Stock'
    };
    
    activeFilters.push({
      type: 'availability',
      label: availabilityLabels[filters.availability],
      onRemove: () => onFilterChange({ ...filters, availability: 'all' })
    });
  }

  // Rating filter
  if (filters.rating > 0) {
    activeFilters.push({
      type: 'rating',
      label: `${filters.rating}+ Stars`,
      onRemove: () => onFilterChange({ ...filters, rating: 0 })
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text-primary">Active Filters:</h3>
        <button
          onClick={onClearAll}
          className="text-sm text-primary hover:text-primary-700 transition-smooth"
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${index}`}
            className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={filter.onRemove}
              className="hover:bg-primary-100 rounded-full p-0.5 transition-smooth"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterChips;