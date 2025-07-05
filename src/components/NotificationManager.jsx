import React, { useEffect } from 'react';
import { usePWA } from '../contexts/PWAContext';
import toast from 'react-hot-toast';

const NotificationManager = () => {
  const { isOnline, requestNotificationPermission } = usePWA();

  useEffect(() => {
    // Request notification permission on first load
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        requestNotificationPermission();
      }, 3000);
    }
  }, [requestNotificationPermission]);

  useEffect(() => {
    // Show online/offline status
    if (isOnline) {
      toast.success('Back online!', {
        duration: 2000,
        id: 'online-status'
      });
    } else {
      toast.error('You are offline', {
        duration: 4000,
        id: 'offline-status'
      });
    }
  }, [isOnline]);

  return null;
};

export default NotificationManager;