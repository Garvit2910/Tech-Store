import React from 'react';
import Icon from 'components/AppIcon';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'inquiry',
      title: 'New WhatsApp inquiry received',
      description: 'Rajesh Kumar inquired about Gaming Laptop RTX 4060',
      timestamp: new Date(Date.now() - 300000),
      icon: 'MessageCircle',
      iconColor: 'text-accent',
      iconBg: 'bg-accent-50'
    },
    {
      id: 2,
      type: 'product',
      title: 'Product updated',
      description: 'Updated specifications for 27" 4K Monitor',
      timestamp: new Date(Date.now() - 900000),
      icon: 'Package',
      iconColor: 'text-primary',
      iconBg: 'bg-primary-50'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low stock alert',
      description: 'Mechanical Keyboard RGB stock is running low (5 units left)',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'AlertTriangle',
      iconColor: 'text-warning',
      iconBg: 'bg-warning-50'
    },
    {
      id: 4,
      type: 'system',
      title: 'Backup completed',
      description: 'Daily system backup completed successfully',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Database',
      iconColor: 'text-secondary-600',
      iconBg: 'bg-secondary-100'
    },
    {
      id: 5,
      type: 'inquiry',
      title: 'Inquiry converted',
      description: 'Priya Sharma purchased 27" 4K Monitor after WhatsApp inquiry',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'CheckCircle',
      iconColor: 'text-accent',
      iconBg: 'bg-accent-50'
    },
    {
      id: 6,
      type: 'product',
      title: 'New product added',
      description: 'Added Gaming Mouse RGB Pro to accessories category',
      timestamp: new Date(Date.now() - 10800000),
      icon: 'Plus',
      iconColor: 'text-primary',
      iconBg: 'bg-primary-50'
    }
  ];

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
            <Icon name="RefreshCw" size={16} />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
            <Icon name="Filter" size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-4">
            {/* Timeline line */}
            <div className="relative flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                <Icon name={activity.icon} size={16} className={activity.iconColor} />
              </div>
              {index < activities.length - 1 && (
                <div className="w-px h-8 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary">{activity.title}</h4>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                </div>
                <span className="text-xs text-text-secondary ml-4 flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full py-2 text-sm text-primary hover:text-primary-700 font-medium transition-smooth flex items-center justify-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>View All Activity</span>
        </button>
      </div>
    </div>
  );
}

export default RecentActivity;