import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import SearchBar from './SearchBar';

function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/product-catalog-homepage', icon: 'Home' },
    { name: 'Categories', path: '/product-category-listing', icon: 'Grid3X3' },
    { name: 'Products', path: '/product-detail-page', icon: 'Package' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/product-catalog-homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Cpu" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">TechStore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="Heart" size={20} />
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="ShoppingCart" size={20} />
            </button>
            <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-smooth flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
              <Icon name="Search" size={20} />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
                  <Icon name="Heart" size={20} />
                </button>
                <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
                  <Icon name="ShoppingCart" size={20} />
                </button>
              </div>
              <button className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-smooth flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default CustomerHeader;