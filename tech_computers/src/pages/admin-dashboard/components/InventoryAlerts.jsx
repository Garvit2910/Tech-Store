import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function InventoryAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'low_stock',
      product: 'Mechanical Keyboard RGB',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
      currentStock: 5,
      minStock: 10,
      severity: 'high',
      category: 'Accessories'
    },
    {
      id: 2,
      type: 'out_of_stock',
      product: 'Gaming Mouse Pro',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      currentStock: 0,
      minStock: 15,
      severity: 'critical',
      category: 'Accessories'
    },
    {
      id: 3,
      type: 'low_stock',
      product: 'USB-C Hub 7-in-1',
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400',
      currentStock: 8,
      minStock: 20,
      severity: 'medium',
      category: 'Accessories'
    },
    {
      id: 4,
      type: 'reorder_point',
      product: '24" LED Monitor',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      currentStock: 12,
      minStock: 15,
      severity: 'low',
      category: 'Monitors'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error-50 border-error-200 text-error-700';
      case 'high': return 'bg-warning-50 border-warning-200 text-warning-700';
      case 'medium': return 'bg-primary-50 border-primary-200 text-primary-700';
      case 'low': return 'bg-secondary-50 border-secondary-200 text-secondary-700';
      default: return 'bg-secondary-50 border-secondary-200 text-secondary-700';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertCircle';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'Clock';
      default: return 'Info';
    }
  };

  const getAlertMessage = (alert) => {
    switch (alert.type) {
      case 'out_of_stock':
        return 'Out of stock - Reorder immediately';
      case 'low_stock':
        return `Only ${alert.currentStock} units left`;
      case 'reorder_point':
        return `Approaching reorder point (${alert.currentStock}/${alert.minStock})`;
      default:
        return 'Inventory alert';
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Inventory Alerts</h3>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error-100 text-error-700">
            {alerts.filter(a => a.severity === 'critical').length} Critical
          </span>
          <Icon name="AlertTriangle" size={20} className="text-error" />
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={alert.image} 
                  alt={alert.product}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{alert.product}</h4>
                    <p className="text-xs text-text-secondary">{alert.category}</p>
                    <p className="text-sm mt-1">{getAlertMessage(alert)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Icon name={getSeverityIcon(alert.severity)} size={16} />
                    <span className="text-xs font-medium uppercase">
                      {alert.severity}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-xs">
                      <span className="text-text-secondary">Current: </span>
                      <span className="font-medium text-text-primary">{alert.currentStock}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-text-secondary">Min: </span>
                      <span className="font-medium text-text-primary">{alert.minStock}</span>
                    </div>
                  </div>
                  
                  <button className="text-xs font-medium hover:underline">
                    Reorder Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <button className="text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
            View All Alerts ({alerts.length})
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth text-sm">
            <Icon name="Package" size={16} />
            <span>Manage Inventory</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryAlerts;