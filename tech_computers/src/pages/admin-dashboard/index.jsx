import React, { useState, useEffect } from 'react';
import AdminSidebar from 'components/ui/AdminSidebar';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import InventoryAlerts from './components/InventoryAlerts';

function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [notifications, setNotifications] = useState([]);

  // Mock dashboard data
  const dashboardStats = [
    {
      id: 1,
      title: 'Total Products',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Package',
      color: 'bg-primary-50 text-primary'
    },
    {
      id: 2,
      title: 'Categories',
      value: '24',
      change: '+2',
      changeType: 'increase',
      icon: 'Grid3X3',
      color: 'bg-accent-50 text-accent'
    },
    {
      id: 3,
      title: 'WhatsApp Inquiries',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: 'MessageCircle',
      color: 'bg-warning-50 text-warning'
    },
    {
      id: 4,
      title: 'Low Stock Items',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'bg-error-50 text-error'
    }
  ];

  const salesData = [
    { month: 'Jan', inquiries: 45, conversions: 32 },
    { month: 'Feb', inquiries: 52, conversions: 38 },
    { month: 'Mar', inquiries: 48, conversions: 35 },
    { month: 'Apr', inquiries: 61, conversions: 42 },
    { month: 'May', inquiries: 55, conversions: 39 },
    { month: 'Jun', inquiries: 67, conversions: 48 }
  ];

  const categoryData = [
    { name: 'Laptops', value: 35, color: '#2563EB' },
    { name: 'Desktops', value: 25, color: '#10B981' },
    { name: 'Monitors', value: 20, color: '#D97706' },
    { name: 'Accessories', value: 20, color: '#DC2626' }
  ];

  const popularProducts = [
    {
      id: 1,
      name: 'Gaming Laptop RTX 4060',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      inquiries: 45,
      category: 'Laptops',
      price: '₹89,999'
    },
    {
      id: 2,
      name: '27" 4K Monitor',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
      inquiries: 38,
      category: 'Monitors',
      price: '₹32,999'
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
      inquiries: 32,
      category: 'Accessories',
      price: '₹8,999'
    }
  ];

  const recentInquiries = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      product: 'Gaming Laptop RTX 4060',
      timestamp: new Date(Date.now() - 300000),
      status: 'pending',
      message: 'Interested in this laptop for gaming. What are the payment options?'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 87654 32109',
      product: '27" 4K Monitor',
      timestamp: new Date(Date.now() - 900000),
      status: 'responded',
      message: 'Need this monitor for graphic design work. Is it color accurate?'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      phone: '+91 76543 21098',
      product: 'Desktop PC i7',
      timestamp: new Date(Date.now() - 1800000),
      status: 'converted',
      message: 'Looking for a desktop for office work. Can you customize the configuration?'
    }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'inquiry',
        message: 'New WhatsApp inquiry received',
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'responded': return 'bg-primary-100 text-primary-700';
      case 'converted': return 'bg-accent-100 text-accent-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs customItems={[
              { name: 'Admin', path: '/admin-dashboard', icon: 'Shield' },
              { name: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard', isLast: true }
            ]} />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
                <p className="text-text-secondary">Welcome back! Here's what's happening with your store.</p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                {/* Time Range Selector */}
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </select>
                
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth relative">
                    <Icon name="Bell" size={20} />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat) => (
              <div key={stat.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-accent' : 'text-error'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-text-secondary text-sm ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon name={stat.icon} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Trends */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Inquiry Trends</h3>
                <Icon name="TrendingUp" size={20} className="text-accent" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" />
                    <YAxis stroke="#64748B" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="inquiries" stroke="#2563EB" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Category Distribution</h3>
                <Icon name="PieChart" size={20} className="text-primary" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-text-secondary">{category.name}</span>
                    <span className="text-sm font-medium text-text-primary">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Popular Products */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Popular Products</h3>
                <Icon name="Star" size={20} className="text-warning" />
              </div>
              <div className="space-y-4">
                {popularProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary-50 transition-smooth">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary truncate">{product.name}</h4>
                      <p className="text-xs text-text-secondary">{product.category}</p>
                      <p className="text-sm font-semibold text-primary">{product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">{product.inquiries}</p>
                      <p className="text-xs text-text-secondary">inquiries</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent WhatsApp Inquiries */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">Recent Inquiries</h3>
                <Icon name="MessageCircle" size={20} className="text-accent" />
              </div>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-text-primary">{inquiry.customerName}</h4>
                        <p className="text-xs text-text-secondary">{inquiry.phone}</p>
                        <p className="text-sm text-text-primary mt-1">{inquiry.product}</p>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">{inquiry.message}</p>
                      </div>
                      <div className="text-right ml-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status}
                        </span>
                        <p className="text-xs text-text-secondary mt-1">{formatTime(inquiry.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary-700 font-medium transition-smooth">
                View All Inquiries
              </button>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="space-y-6">
              <QuickActions />
              <InventoryAlerts />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;