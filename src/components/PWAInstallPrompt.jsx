import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { usePWA } from '../contexts/PWAContext';

const { FiDownload, FiX } = FiIcons;

const PWAInstallPrompt = () => {
  const { showInstallPrompt, installApp, dismissInstallPrompt } = usePWA();

  if (!showInstallPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
      >
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <SafeIcon icon={FiDownload} className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Install App</h3>
                <p className="text-sm text-gray-600">
                  Install Urban Chill Cafe for a better experience
                </p>
              </div>
            </div>
            <button
              onClick={dismissInstallPrompt}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <SafeIcon icon={FiX} className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={installApp}
              className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Install
            </button>
            <button
              onClick={dismissInstallPrompt}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;