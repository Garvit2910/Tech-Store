import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

function QuickActions() {
  const quickActions = [
    {
      id: 1,
      title: 'Add Product',
      description: 'Add new product to inventory',
      icon: 'Plus',
      color: 'bg-primary text-white hover:bg-primary-700',
      path: '/admin-product-management'
    },
    {
      id: 2,
      title: 'Manage Categories',
      description: 'Organize product categories',
      icon: 'Grid3X3',
      color: 'bg-accent text-white hover:bg-accent-600',
      path: '/admin-product-management'
    },
    {
      id: 3,
      title: 'Export Data',
      description: 'Download product catalog',
      icon: 'Download',
      color: 'bg-secondary-600 text-white hover:bg-secondary-700',
      action: () => console.log('Export data')
    },
    {
      id: 4,
      title: 'View Analytics',
      description: 'Detailed sales reports',
      icon: 'BarChart3',
      color: 'bg-warning text-white hover:bg-warning-700',
      path: '/admin-analytics'
    }
  ];

  const handleAction = (action) => {
    if (action.action) {
      action.action();
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-warning" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {quickActions.map((action) => (
          action.path ? (
            <Link
              key={action.id}
              to={action.path}
              className={`p-4 rounded-lg transition-smooth flex items-center space-x-3 ${action.color}`}
            >
              <Icon name={action.icon} size={20} />
              <div className="flex-1">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <Icon name="ArrowRight" size={16} />
            </Link>
          ) : (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className={`p-4 rounded-lg transition-smooth flex items-center space-x-3 text-left ${action.color}`}
            >
              <Icon name={action.icon} size={20} />
              <div className="flex-1">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <Icon name="ArrowRight" size={16} />
            </button>
          )
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 py-2 px-4 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-smooth">
            <Icon name="Search" size={16} />
            <span className="text-sm">Search Products</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-smooth">
            <Icon name="Settings" size={16} />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;