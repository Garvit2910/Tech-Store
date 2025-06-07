import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function HeroBanner() {
  const heroData = {
    title: "Latest Gaming Laptops & High-Performance PCs",
    subtitle: "Discover cutting-edge technology with unbeatable prices",
    description: "From gaming laptops to professional workstations, find the perfect computer hardware for your needs. Get instant quotes via WhatsApp!",
    ctaText: "Explore Products",
    ctaLink: "/product-category-listing",
    backgroundImage: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=600&fit=crop",
    features: [
      { icon: "Zap", text: "Latest Technology" },
      { icon: "Shield", text: "1 Year Warranty" },
      { icon: "Truck", text: "Free Delivery" },
      { icon: "MessageCircle", text: "WhatsApp Support" }
    ]
  };

  return (
    <section className="relative overflow-hidden rounded-2xl mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/80 z-10"></div>
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage}
          alt="Gaming Setup"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 px-8 py-16 lg:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {heroData.title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-primary-100 mb-4 font-medium">
            {heroData.subtitle}
          </p>
          
          <p className="text-lg text-primary-50 mb-8 max-w-2xl leading-relaxed">
            {heroData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              to={heroData.ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-600 transition-smooth font-semibold text-lg"
            >
              <Icon name="Search" size={20} className="mr-2" />
              {heroData.ctaText}
            </Link>
            
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-smooth font-semibold text-lg backdrop-blur-sm">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              WhatsApp Inquiry
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {heroData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon name={feature.icon} size={20} />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;