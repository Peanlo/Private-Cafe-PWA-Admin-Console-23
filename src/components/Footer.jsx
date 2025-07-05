import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useBusiness } from '../contexts/BusinessContext';

const { FiCoffee, FiMail, FiPhone, FiMapPin, FiGlobe } = FiIcons;

const Footer = () => {
  const { businessInfo } = useBusiness();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiCoffee} className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold">{businessInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4">
              {businessInfo.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="h-4 w-4 text-amber-400" />
                <span className="text-sm">{businessInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="h-4 w-4 text-amber-400" />
                <span className="text-sm">{businessInfo.phone}</span>
              </div>
              {businessInfo.address && (
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiMapPin} className="h-4 w-4 text-amber-400" />
                  <span className="text-sm">{businessInfo.address}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGlobe} className="h-4 w-4 text-amber-400" />
                <span className="text-sm">{businessInfo.website}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {businessInfo.company}. All rights reserved. | Private Access Only
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;