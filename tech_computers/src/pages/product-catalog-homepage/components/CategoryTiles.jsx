import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function CategoryTiles() {
  const categories = [
    {
      id: 1,
      name: "Laptops",
      productCount: 45,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      icon: "Laptop",
      description: "Gaming & Professional Laptops",
      link: "/product-category-listing?category=laptops"
    },
    {
      id: 2,
      name: "Desktop PCs",
      productCount: 32,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
      icon: "Monitor",
      description: "Custom Built & Pre-Built PCs",
      link: "/product-category-listing?category=desktops"
    },
    {
      id: 3,
      name: "Monitors",
      productCount: 28,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
      icon: "Monitor",
      description: "Gaming & Professional Displays",
      link: "/product-category-listing?category=monitors"
    },
    {
      id: 4,
      name: "Accessories",
      productCount: 67,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      icon: "Gamepad2",
      description: "Keyboards, Mice & More",
      link: "/product-category-listing?category=accessories"
    }
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Shop by Category</h2>
          <p className="text-text-secondary">Find exactly what you're looking for</p>
        </div>
        <Link
          to="/product-category-listing"
          className="hidden sm:flex items-center text-primary hover:text-primary-700 transition-smooth font-medium"
        >
          View All Categories
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group bg-surface rounded-xl border border-border hover:border-primary-200 transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon name={category.icon} size={20} className="text-primary" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.description}</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">
                  {category.productCount} Products
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-primary group-hover:translate-x-1 transition-transform" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sm:hidden mt-6 text-center">
        <Link
          to="/product-category-listing"
          className="inline-flex items-center text-primary hover:text-primary-700 transition-smooth font-medium"
        >
          View All Categories
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}

export default CategoryTiles;