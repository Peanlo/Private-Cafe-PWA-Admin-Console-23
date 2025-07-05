import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { usePWA } from '../../contexts/PWAContext';

const { FiSave, FiLock, FiEye, FiEyeOff, FiBell, FiDownload, FiTrash2 } = FiIcons;

const AdminSettings = () => {
  const { changePassword } = useAuth();
  const { requestNotificationPermission, sendNotification } = usePWA();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const success = await changePassword(data.currentPassword, data.newPassword);
      if (success) {
        toast.success('Password changed successfully!');
        reset();
      } else {
        toast.error('Current password is incorrect');
      }
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleNotificationTest = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      sendNotification('Test Notification', {
        body: 'This is a test notification from Urban Chill Cafe admin panel.',
        icon: '/pwa-192x192.png'
      });
      toast.success('Test notification sent!');
    } else {
      toast.error('Notification permission denied');
    }
  };

  const handleClearCache = () => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
      toast.success('Cache cleared successfully!');
    }
  };

  const handleExportData = () => {
    const data = {
      businessInfo: JSON.parse(localStorage.getItem('business_info') || '{}'),
      operatingHours: JSON.parse(localStorage.getItem('operating_hours') || '{}'),
      menuItems: JSON.parse(localStorage.getItem('menu_items') || '[]'),
      branding: JSON.parse(localStorage.getItem('branding') || '{}'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urban-chill-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (data.businessInfo) localStorage.setItem('business_info', JSON.stringify(data.businessInfo));
          if (data.operatingHours) localStorage.setItem('operating_hours', JSON.stringify(data.operatingHours));
          if (data.menuItems) localStorage.setItem('menu_items', JSON.stringify(data.menuItems));
          if (data.branding) localStorage.setItem('branding', JSON.stringify(data.branding));
          
          toast.success('Data imported successfully! Please refresh the page.');
        } catch (error) {
          toast.error('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Password Change */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiLock} className="h-5 w-5 mr-2" />
          Change Password
        </h2>
        
        <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                {...register('currentPassword', { required: 'Current password is required' })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showCurrentPassword ? FiEyeOff : FiEye} className="h-5 w-5" />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword', { 
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showNewPassword ? FiEyeOff : FiEye} className="h-5 w-5" />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', { 
                  required: 'Please confirm your new password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="h-5 w-5" />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="h-4 w-4" />
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </motion.div>

      {/* PWA Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiBell} className="h-5 w-5 mr-2" />
          PWA Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600">Test push notification functionality</p>
            </div>
            <button
              onClick={handleNotificationTest}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test Notification
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Cache Management</h3>
              <p className="text-sm text-gray-600">Clear application cache</p>
            </div>
            <button
              onClick={handleClearCache}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiTrash2} className="h-4 w-4" />
              <span>Clear Cache</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiDownload} className="h-5 w-5 mr-2" />
          Data Management
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-600">Download all application data as JSON</p>
            </div>
            <button
              onClick={handleExportData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Import Data</h3>
              <p className="text-sm text-gray-600">Upload and restore application data</p>
            </div>
            <label className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
              Import
            </label>
          </div>
        </div>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Version:</span>
            <p className="font-medium">1.0.0</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Last Updated:</span>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">PWA Status:</span>
            <p className="font-medium text-green-600">Active</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Privacy Mode:</span>
            <p className="font-medium text-blue-600">Enabled</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;