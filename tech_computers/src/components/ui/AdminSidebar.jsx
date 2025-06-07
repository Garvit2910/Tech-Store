import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    {
      name: 'Product Management',
      path: '/admin-product-management',
      icon: 'Package',
      description: 'Manage Inventory'
    },
    {
      name: 'Orders',
      path: '/admin-orders',
      icon: 'ShoppingBag',
      description: 'Order Management'
    },
    {
      name: 'Customers',
      path: '/admin-customers',
      icon: 'Users',
      description: 'Customer Database'
    },
    {
      name: 'Analytics',
      path: '/admin-analytics',
      icon: 'BarChart3',
      description: 'Sales Reports'
    },
    {
      name: 'Settings',
      path: '/admin-settings',
      icon: 'Settings',
      description: 'System Configuration'
    }
  ];

  const quickActions = [
    { name: 'Add Product', icon: 'Plus', action: () => console.log('Add Product') },
    { name: 'Export Data', icon: 'Download', action: () => console.log('Export Data') },
    { name: 'Backup', icon: 'Database', action: () => console.log('Backup') }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-200 bg-black bg-opacity-50"
          onClick={toggleMobile}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-300 p-2 bg-surface rounded-md shadow-md border border-border"
      >
        <Icon name="Menu" size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-200 h-full bg-surface border-r border-border transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-text-primary">Admin Panel</span>
              </div>
            )}
            <button
              onClick={toggleCollapse}
              className="hidden lg:block p-1 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-smooth group
                    ${isActivePath(item.path)
                      ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-text-secondary group-hover:text-text-primary">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            {!isCollapsed && (
              <div className="mt-8 px-2">
                <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Quick Actions
                </div>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.name}
                      onClick={action.action}
                      className="w-full flex items-center px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-smooth"
                    >
                      <Icon name={action.icon} size={16} className="mr-3" />
                      {action.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary">Admin User</div>
                  <div className="text-xs text-text-secondary">admin@techstore.com</div>
                </div>
                <Link
                  to="/admin-login"
                  className="p-1 text-text-secondary hover:text-text-primary transition-smooth"
                  title="Logout"
                >
                  <Icon name="LogOut" size={16} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <Link
                  to="/admin-login"
                  className="p-1 text-text-secondary hover:text-text-primary transition-smooth"
                  title="Logout"
                >
                  <Icon name="LogOut" size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
}

export default AdminSidebar;