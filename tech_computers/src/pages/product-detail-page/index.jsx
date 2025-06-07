import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CustomerHeader from 'components/ui/CustomerHeader';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Icon from 'components/AppIcon';

import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductSpecifications from './components/ProductSpecifications';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';

function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'ASUS ROG Strix G15 Gaming Laptop',
      category: 'Gaming Laptops',
      categorySlug: 'gaming-laptops',
      originalPrice: 89999,
      discountedPrice: 74999,
      discountPercentage: 17,
      availability: 'In Stock',
      stockCount: 5,
      rating: 4.5,
      reviewCount: 128,
      shortDescription: 'High-performance gaming laptop with AMD Ryzen 7 processor and NVIDIA RTX 3060 graphics card.',
      description: `Experience next-level gaming with the ASUS ROG Strix G15. This powerhouse gaming laptop features the latest AMD Ryzen 7 5800H processor paired with NVIDIA GeForce RTX 3060 graphics card, delivering exceptional performance for gaming, streaming, and content creation.

The 15.6-inch Full HD display with 144Hz refresh rate ensures smooth gameplay with vibrant colors and sharp details. The laptop's advanced cooling system keeps temperatures optimal during intense gaming sessions, while the RGB backlit keyboard adds a premium gaming aesthetic.

Built for gamers who demand performance, reliability, and style, the ROG Strix G15 is your gateway to competitive gaming excellence.`,
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      specifications: {
        'Processor': {
          'CPU': 'AMD Ryzen 7 5800H (8-core, 16-thread)','Base Clock': '3.2 GHz','Max Boost Clock': 'Up to 4.4 GHz','Cache': '16MB L3 Cache'
        },
        'Graphics': {
          'GPU': 'NVIDIA GeForce RTX 3060 6GB GDDR6','GPU Memory': '6GB GDDR6','Ray Tracing': 'Yes','DLSS': 'Yes'
        },
        'Memory & Storage': {
          'RAM': '16GB DDR4-3200','Storage': '512GB PCIe NVMe SSD','Expandable': 'Up to 32GB RAM, Additional M.2 slot'
        },
        'Display': {
          'Screen Size': '15.6 inches','Resolution': '1920 x 1080 (Full HD)','Refresh Rate': '144Hz','Panel Type': 'IPS-level','Color Gamut': '100% sRGB'
        },
        'Connectivity': {
          'Wi-Fi': 'Wi-Fi 6 (802.11ax)','Bluetooth': 'Bluetooth 5.1','USB Ports': '3x USB 3.2 Gen 1, 1x USB 3.2 Gen 2 Type-C','HDMI': 'HDMI 2.0b','Audio': '3.5mm Combo Audio Jack'
        },
        'Physical': {
          'Dimensions': '359.8 x 256 x 22.8 mm','Weight': '2.3 kg','Battery': '90Wh 4-cell','Adapter': '240W AC Adapter'
        }
      },
      variants: [
        {
          name: '16GB RAM / 512GB SSD',
          price: 74999,
          originalPrice: 89999,
          available: true
        },
        {
          name: '32GB RAM / 1TB SSD',
          price: 94999,
          originalPrice: 109999,
          available: true
        }
      ],
      features: [
        'AMD Ryzen 7 5800H Processor','NVIDIA RTX 3060 Graphics','144Hz Full HD Display','RGB Backlit Keyboard','Advanced Cooling System','Wi-Fi 6 Connectivity'
      ],
      tags: ['Gaming', 'High Performance', 'RTX', 'AMD Ryzen', 'RGB']
    }
  ];

  const mockRelatedProducts = [
    {
      id: '2',
      name: 'MSI GF63 Thin Gaming Laptop',
      originalPrice: 65999,
      discountedPrice: 54999,
      discountPercentage: 17,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      rating: 4.2,
      category: 'Gaming Laptops'
    },
    {
      id: '3',
      name: 'HP Pavilion Gaming Laptop',
      originalPrice: 72999,
      discountedPrice: 61999,
      discountPercentage: 15,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      rating: 4.0,
      category: 'Gaming Laptops'
    },
    {
      id: '4',
      name: 'Lenovo Legion 5 Gaming Laptop',
      originalPrice: 85999,
      discountedPrice: 72999,
      discountPercentage: 15,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop',
      rating: 4.6,
      category: 'Gaming Laptops'
    },
    {
      id: '5',
      name: 'Acer Nitro 5 Gaming Laptop',
      originalPrice: 58999,
      discountedPrice: 49999,
      discountPercentage: 15,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
      rating: 4.1,
      category: 'Gaming Laptops'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId);
      setProduct(foundProduct || mockProducts[0]);
      setLoading(false);
    }, 500);
  }, [productId]);

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    
    const variant = product.variants[selectedVariant];
    const message = `Hi! I'm interested in the ${product.name} (${variant.name}) priced at ₹${variant.price.toLocaleString()}. Could you please provide more details about availability and purchase process?`;
    const phoneNumber = '+919876543210'; // Mock phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/product-catalog-homepage', icon: 'Home' },
    { name: 'Categories', path: '/product-category-listing', icon: 'Grid3X3' },
    { name: product?.category || 'Product', path: `/product-category-listing?category=${product?.categorySlug}`, icon: 'Package' },
    { name: product?.name || 'Product Details', path: null, icon: 'Eye', isLast: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-secondary-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-secondary-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-6 bg-secondary-200 rounded w-1/2"></div>
                <div className="h-4 bg-secondary-200 rounded w-full"></div>
                <div className="h-4 bg-secondary-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Icon name="Package" size={64} className="mx-auto text-secondary-400 mb-4" />
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Product Not Found</h2>
            <p className="text-text-secondary mb-6">The product you're looking for doesn't exist.</p>
            <Link
              to="/product-catalog-homepage"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs customItems={breadcrumbItems} />
        
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <ProductImageGallery 
            images={product.images} 
            videos={product.videos}
            productName={product.name}
          />
          
          {/* Product Information */}
          <ProductInfo 
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            onWhatsAppInquiry={handleWhatsAppInquiry}
          />
        </div>

        {/* Product Specifications */}
        <ProductSpecifications specifications={product.specifications} />

        {/* Customer Reviews */}
        <CustomerReviews 
          rating={product.rating}
          reviewCount={product.reviewCount}
          productId={product.id}
        />

        {/* Related Products */}
        <RelatedProducts 
          products={mockRelatedProducts}
          currentProductId={product.id}
          category={product.category}
        />
      </main>
    </div>
  );
}

export default ProductDetailPage;