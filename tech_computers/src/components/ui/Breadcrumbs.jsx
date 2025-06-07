import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

function Breadcrumbs({ customItems = null }) {
  const location = useLocation();

  const pathMapping = {
    '/product-catalog-homepage': { name: 'Home', icon: 'Home' },
    '/product-category-listing': { name: 'Categories', icon: 'Grid3X3' },
    '/product-detail-page': { name: 'Product Details', icon: 'Package' },
    '/admin-login': { name: 'Admin Login', icon: 'LogIn' },
    '/admin-dashboard': { name: 'Dashboard', icon: 'LayoutDashboard' },
    '/admin-product-management': { name: 'Product Management', icon: 'Package' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ name: 'Home', path: '/product-catalog-homepage', icon: 'Home' }];

    if (location.pathname === '/product-catalog-homepage') {
      return breadcrumbs;
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMapping[currentPath];
      
      if (pathInfo) {
        breadcrumbs.push({
          name: pathInfo.name,
          path: currentPath,
          icon: pathInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path || index} className="flex items-center">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="mx-2 text-secondary-400" />
            )}
            
            {crumb.isLast || !crumb.path ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                {crumb.icon && <Icon name={crumb.icon} size={14} />}
                <span className="truncate max-w-32 sm:max-w-none">{crumb.name}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
              >
                {crumb.icon && <Icon name={crumb.icon} size={14} />}
                <span className="truncate max-w-32 sm:max-w-none">{crumb.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;