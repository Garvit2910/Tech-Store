import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerData = {
    company: {
      name: "Tech Computers",
      description: "Your trusted partner for all computer hardware needs. From gaming laptops to professional workstations, we provide quality products with excellent customer service.",
      address: "123 Tech Street, Electronics Market, Mumbai, Maharashtra 400001",
      phone: "+91 98765 43210",
      email: "info@techcomputers.com",
      whatsapp: "+91 98765 43210"
    },
    quickLinks: [
      { name: "Home", path: "/product-catalog-homepage" },
      { name: "Categories", path: "/product-category-listing" },
      { name: "About Us", path: "#" },
      { name: "Contact", path: "#" },
      { name: "Support", path: "#" }
    ],
    categories: [
      { name: "Laptops", path: "/product-category-listing?category=laptops" },
      { name: "Desktop PCs", path: "/product-category-listing?category=desktops" },
      { name: "Monitors", path: "/product-category-listing?category=monitors" },
      { name: "Accessories", path: "/product-category-listing?category=accessories" },
      { name: "Components", path: "/product-category-listing?category=components" }
    ],
    services: [
      "Custom PC Building",
      "Hardware Installation",
      "Technical Support",
      "Warranty Service",
      "Home Delivery"
    ],
    socialLinks: [
      { name: "Facebook", icon: "Facebook", url: "#" },
      { name: "Instagram", icon: "Instagram", url: "#" },
      { name: "Twitter", icon: "Twitter", url: "#" },
      { name: "YouTube", icon: "Youtube", url: "#" }
    ]
  };

  const handleWhatsAppContact = () => {
    const message = "Hi! I'd like to know more about your products and services.";
    const whatsappUrl = `https://wa.me/${footerData.company.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Cpu" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">{footerData.company.name}</span>
            </div>
            
            <p className="text-secondary-300 mb-6 text-sm leading-relaxed">
              {footerData.company.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">{footerData.company.address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary flex-shrink-0" />
                <a href={`tel:${footerData.company.phone}`} className="text-secondary-300 hover:text-white transition-smooth text-sm">
                  {footerData.company.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary flex-shrink-0" />
                <a href={`mailto:${footerData.company.email}`} className="text-secondary-300 hover:text-white transition-smooth text-sm">
                  {footerData.company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-white transition-smooth text-sm flex items-center"
                  >
                    <Icon name="ChevronRight" size={12} className="mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerData.categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    className="text-secondary-300 hover:text-white transition-smooth text-sm flex items-center"
                  >
                    <Icon name="ChevronRight" size={12} className="mr-2" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 mb-6">
              {footerData.services.map((service, index) => (
                <li key={index} className="text-secondary-300 text-sm flex items-center">
                  <Icon name="CheckCircle" size={12} className="mr-2 text-accent" />
                  {service}
                </li>
              ))}
            </ul>

            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent-600 transition-smooth font-medium text-sm flex items-center justify-center mb-4"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              WhatsApp Us
            </button>

            <div className="flex space-x-3">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 bg-secondary-700 rounded-lg flex items-center justify-center hover:bg-primary transition-smooth"
                  title={social.name}
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-secondary-400 text-sm mb-4 md:mb-0">
              © {currentYear} {footerData.company.name}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-secondary-400 hover:text-white transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-smooth">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;