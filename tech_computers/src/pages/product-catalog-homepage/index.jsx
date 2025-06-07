import React, { useState, useEffect } from 'react';

import CustomerHeader from 'components/ui/CustomerHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';


import HeroBanner from './components/HeroBanner';
import CategoryTiles from './components/CategoryTiles';
import FeaturedProducts from './components/FeaturedProducts';
import PromotionalBanner from './components/PromotionalBanner';
import Footer from './components/Footer';

function ProductCatalogHomepage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-secondary-200 rounded-lg"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-secondary-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-secondary-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs customItems={[
          { name: 'Home', path: '/product-catalog-homepage', icon: 'Home', isLast: true }
        ]} />

        {/* Hero Banner */}
        <HeroBanner />

        {/* Category Tiles */}
        <CategoryTiles />

        {/* Promotional Banner */}
        <PromotionalBanner />

        {/* Featured Products */}
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  );
}

export default ProductCatalogHomepage;