import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function PromotionalBanner() {
  const promoData = {
    title: "Limited Time Offer",
    subtitle: "Up to 30% Off Gaming Laptops",
    description: "Get the best deals on high-performance gaming laptops. Limited stock available!",
    ctaText: "Shop Now",
    ctaLink: "/product-category-listing?category=laptops&sale=true",
    backgroundImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop",
    badge: "SALE",
    validUntil: "Offer valid until stocks last"
  };

  return (
    <section className="mb-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-600">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={promoData.backgroundImage}
            alt="Gaming Laptop Sale"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-8 lg:mb-0">
              <div className="flex items-center mb-4">
                <span className="bg-white text-accent px-3 py-1 rounded-full text-sm font-bold mr-4">
                  {promoData.badge}
                </span>
                <span className="text-accent-100 text-sm">{promoData.validUntil}</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {promoData.title}
              </h2>
              
              <p className="text-xl lg:text-2xl text-accent-100 mb-4 font-semibold">
                {promoData.subtitle}
              </p>
              
              <p className="text-accent-50 mb-6 max-w-md">
                {promoData.description}
              </p>
              
              <Link
                to={promoData.ctaLink}
                className="inline-flex items-center px-8 py-4 bg-white text-accent rounded-lg hover:bg-accent-50 transition-smooth font-semibold text-lg"
              >
                {promoData.ctaText}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Link>
            </div>
            
            <div className="flex-shrink-0 lg:ml-8">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl lg:text-7xl font-bold text-white mb-2">30%</div>
                    <div className="text-xl text-accent-100 font-semibold">OFF</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotionalBanner;