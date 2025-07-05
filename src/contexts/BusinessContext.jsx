import React, { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Urban Chill Cafe',
    company: 'nnn',
    email: 'me@peterlockwood.com',
    phone: '1234-5678',
    website: 'https://urbanchill.com.au',
    address: '',
    description: 'Premium cafe experience with modern convenience',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });

  const [operatingHours, setOperatingHours] = useState({
    monday: { open: '07:00', close: '18:00', closed: false },
    tuesday: { open: '07:00', close: '18:00', closed: false },
    wednesday: { open: '07:00', close: '18:00', closed: false },
    thursday: { open: '07:00', close: '18:00', closed: false },
    friday: { open: '07:00', close: '18:00', closed: false },
    saturday: { open: '08:00', close: '17:00', closed: false },
    sunday: { open: '08:00', close: '17:00', closed: false }
  });

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso shot',
      price: 3.50,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
      available: true
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfect blend of espresso, steamed milk, and foam',
      price: 4.50,
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      available: true
    },
    {
      id: 3,
      name: 'Avocado Toast',
      description: 'Fresh avocado on sourdough with lime and herbs',
      price: 12.00,
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1603046891744-8c2a4dca4e6d?w=400',
      available: true
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery, flaky French pastry',
      price: 5.50,
      category: 'Pastries',
      image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400',
      available: true
    }
  ]);

  const [branding, setBranding] = useState({
    logo: '',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    fontFamily: 'Inter',
    customCSS: ''
  });

  useEffect(() => {
    // Load data from localStorage
    const savedBusiness = localStorage.getItem('business_info');
    const savedHours = localStorage.getItem('operating_hours');
    const savedMenu = localStorage.getItem('menu_items');
    const savedBranding = localStorage.getItem('branding');

    if (savedBusiness) {
      setBusinessInfo(JSON.parse(savedBusiness));
    }
    if (savedHours) {
      setOperatingHours(JSON.parse(savedHours));
    }
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }
    if (savedBranding) {
      setBranding(JSON.parse(savedBranding));
    }
  }, []);

  const updateBusinessInfo = (newInfo) => {
    setBusinessInfo(newInfo);
    localStorage.setItem('business_info', JSON.stringify(newInfo));
  };

  const updateOperatingHours = (newHours) => {
    setOperatingHours(newHours);
    localStorage.setItem('operating_hours', JSON.stringify(newHours));
  };

  const updateMenuItems = (newItems) => {
    setMenuItems(newItems);
    localStorage.setItem('menu_items', JSON.stringify(newItems));
  };

  const updateBranding = (newBranding) => {
    setBranding(newBranding);
    localStorage.setItem('branding', JSON.stringify(newBranding));
  };

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now()
    };
    const updatedItems = [...menuItems, newItem];
    updateMenuItems(updatedItems);
    return newItem;
  };

  const updateMenuItem = (id, updates) => {
    const updatedItems = menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    updateMenuItems(updatedItems);
  };

  const deleteMenuItem = (id) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    updateMenuItems(updatedItems);
  };

  const getMenuCategories = () => {
    return [...new Set(menuItems.map(item => item.category))];
  };

  const value = {
    businessInfo,
    operatingHours,
    menuItems,
    branding,
    updateBusinessInfo,
    updateOperatingHours,
    updateMenuItems,
    updateBranding,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuCategories
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};