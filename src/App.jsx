import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PWAProvider } from './contexts/PWAContext';
import { BusinessProvider } from './contexts/BusinessContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminBusiness from './pages/admin/AdminBusiness';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMedia from './pages/admin/AdminMedia';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import NotificationManager from './components/NotificationManager';

function App() {
  return (
    <AuthProvider>
      <PWAProvider>
        <BusinessProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="menu" element={<Menu />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                </Route>
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="menu" element={<AdminMenu />} />
                  <Route path="business" element={<AdminBusiness />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
              
              <PWAInstallPrompt />
              <NotificationManager />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#8B4513',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </BusinessProvider>
      </PWAProvider>
    </AuthProvider>
  );
}

export default App;