import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useBusiness } from '../../contexts/BusinessContext';
import { usePWA } from '../../contexts/PWAContext';

const { FiCoffee, FiUsers, FiDollarSign, FiTrendingUp, FiWifi, FiWifiOff } = FiIcons;

const AdminDashboard = () => {
  const { menuItems, businessInfo } = useBusiness();
  const { isOnline } = usePWA();

  const stats = [
    {
      name: 'Total Menu Items',
      value: menuItems.length,
      icon: FiCoffee,
      color: 'bg-blue-500'
    },
    {
      name: 'Available Items',
      value: menuItems.filter(item => item.available).length,
      icon: FiTrendingUp,
      color: 'bg-green-500'
    },
    {
      name: 'Categories',
      value: new Set(menuItems.map(item => item.category)).size,
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      name: 'Average Price',
      value: `$${(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length || 0).toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <SafeIcon 
            icon={isOnline ? FiWifi : FiWifiOff} 
            className={`h-5 w-5 ${isOnline ? 'text-green-500' : 'text-red-500'}`} 
          />
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Business Info Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Name:</span>
              <p className="font-medium">{businessInfo.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Email:</span>
              <p className="font-medium">{businessInfo.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Phone:</span>
              <p className="font-medium">{businessInfo.phone}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Website:</span>
              <p className="font-medium">{businessInfo.website}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Menu Items</h2>
          <div className="space-y-3">
            {menuItems.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-amber-600">${item.price.toFixed(2)}</p>
                  <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <SafeIcon icon={FiCoffee} className="h-6 w-6 text-amber-600 mb-2" />
            <h3 className="font-medium text-gray-900">Add Menu Item</h3>
            <p className="text-sm text-gray-500">Create a new menu item</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-500">View and manage users</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-500">Check performance metrics</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;