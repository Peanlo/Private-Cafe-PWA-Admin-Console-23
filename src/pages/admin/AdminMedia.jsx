import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiImage, FiUpload, FiTrash2, FiDownload, FiSearch, FiFolder } = FiIcons;

const AdminMedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Mock media data for demonstration
  const [mediaFiles] = useState([
    {
      id: 1,
      name: 'espresso.jpg',
      url: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
      type: 'image',
      size: '245 KB',
      category: 'Menu',
      uploadDate: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'cappuccino.jpg',
      url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      type: 'image',
      size: '312 KB',
      category: 'Menu',
      uploadDate: '2024-01-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'avocado-toast.jpg',
      url: 'https://images.unsplash.com/photo-1603046891744-8c2a4dca4e6d?w=400',
      type: 'image',
      size: '428 KB',
      category: 'Menu',
      uploadDate: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      name: 'cafe-interior.jpg',
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      type: 'image',
      size: '567 KB',
      category: 'Gallery',
      uploadDate: '2024-01-12T14:20:00Z'
    },
    {
      id: 5,
      name: 'logo.png',
      url: '/pwa-192x192.png',
      type: 'image',
      size: '12 KB',
      category: 'Branding',
      uploadDate: '2024-01-11T11:00:00Z'
    }
  ]);

  const categories = ['All', 'Menu', 'Gallery', 'Branding'];

  const filteredMedia = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // In a real app, you would upload to a server or cloud storage
        toast.success(`${file.name} uploaded successfully!`);
      } else {
        toast.error(`${file.name} is not a valid image file`);
      }
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      // In a real app, you would delete from server/storage
      toast.success(`${name} deleted successfully!`);
    }
  };

  const handleDownload = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(`${name} downloaded!`);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
        <label className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer flex items-center space-x-2">
          <SafeIcon icon={FiUpload} className="h-4 w-4" />
          <span>Upload Files</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFolder} className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Image Preview */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            {/* File Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate" title={file.name}>
                {file.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {file.size} • {formatDate(file.uploadDate)}
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                {file.category}
              </span>
            </div>
            
            {/* Actions */}
            <div className="px-4 pb-4 flex justify-between items-center">
              <button
                onClick={() => copyToClipboard(file.url)}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Copy URL
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownload(file.url, file.name)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Download"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.id, file.name)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiImage} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No media files found matching your criteria.</p>
        </div>
      )}

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{mediaFiles.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <SafeIcon icon={FiImage} className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">1.5 MB</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <SafeIcon icon={FiFolder} className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Uploads</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <SafeIcon icon={FiUpload} className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminMedia;