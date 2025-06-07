import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

function SearchBar({ placeholder = "Search products...", onSearch = () => {}, className = "" }) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, name: 'Gaming Laptop', category: 'Laptops', type: 'product' },
    { id: 2, name: 'Graphics Card', category: 'Components', type: 'product' },
    { id: 3, name: 'Mechanical Keyboard', category: 'Peripherals', type: 'product' },
    { id: 4, name: 'Gaming Mouse', category: 'Peripherals', type: 'product' },
    { id: 5, name: 'SSD Storage', category: 'Storage', type: 'product' },
    { id: 6, name: 'Laptops', category: '', type: 'category' },
    { id: 7, name: 'Desktop PCs', category: '', type: 'category' },
    { id: 8, name: 'Components', category: '', type: 'category' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (query.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center bg-secondary-50 border border-border rounded-lg transition-all duration-200
          ${isExpanded ? 'ring-2 ring-primary-500 border-primary-500' : 'hover:border-secondary-300'}
        `}>
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 text-secondary-400" 
          />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-transparent border-0 focus:ring-0 focus:outline-none text-text-primary placeholder-secondary-400"
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 p-1 text-secondary-400 hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-secondary-50 transition-smooth flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={suggestion.type === 'category' ? 'Folder' : 'Package'} 
                    size={16} 
                    className="text-secondary-400" 
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {suggestion.name}
                    </div>
                    {suggestion.category && (
                      <div className="text-xs text-text-secondary">
                        in {suggestion.category}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-secondary-400 capitalize">
                  {suggestion.type}
                </div>
              </button>
            ))}
          </div>
          
          {query && (
            <div className="border-t border-border px-4 py-2">
              <button
                onClick={() => handleSuggestionClick({ name: query })}
                className="w-full text-left text-sm text-primary hover:text-primary-700 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Search" size={14} />
                <span>Search for "{query}"</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;