import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Breadcrumbs from 'components/ui/Breadcrumbs';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'admin@techcomputers.com',
    password: 'admin123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
      // Simulate successful login
      localStorage.setItem('adminToken', 'mock-admin-token');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      alert('Password reset link sent to your email!');
    }, 2000);
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/product-catalog-homepage', icon: 'Home' },
    { name: 'Admin Login', path: '/admin-login', icon: 'LogIn', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/product-catalog-homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Cpu" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">Tech Computers</span>
            </Link>
            
            <Link
              to="/product-catalog-homepage"
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs customItems={breadcrumbItems} />
          
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md">
              {/* Login Card */}
              <div className="bg-surface rounded-lg shadow-lg border border-border p-8">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={32} color="white" />
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Login</h1>
                  <p className="text-text-secondary">Access your inventory management system</p>
                </div>

                {/* Demo Credentials Info */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-primary mb-1">Demo Credentials:</p>
                      <p className="text-text-secondary">Email: admin@techcomputers.com</p>
                      <p className="text-text-secondary">Password: admin123</p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-error" />
                      <p className="text-sm text-error font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Icon name="Mail" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Icon name="Lock" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-smooth"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-text-primary transition-smooth"
                      >
                        <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary">Remember me</span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={showForgotPassword}
                      className="text-sm text-primary hover:text-primary-700 transition-smooth disabled:opacity-50"
                    >
                      {showForgotPassword ? 'Sending...' : 'Forgot password?'}
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" size={18} />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Shield" size={14} />
                    <span>Secure admin access protected by encryption</span>
                  </div>
                </div>
              </div>

              {/* Additional Security Features */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Session timeout: 8 hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Lock" size={14} />
                    <span>SSL encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="Cpu" size={14} color="white" />
              </div>
              <span className="text-sm text-text-secondary">
                © {new Date().getFullYear()} Tech Computers. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>Admin Portal v2.1</span>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminLogin;