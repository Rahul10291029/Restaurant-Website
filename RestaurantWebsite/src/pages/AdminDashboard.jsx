import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sections = [
    {
      title: 'Home Page',
      description: 'Edit hero section, philosophy, and images',
      icon: '🏠',
      path: '/admin/content?page=home'
    },
    {
      title: 'Menu Page',
      description: 'Update menu items, images, and descriptions',
      icon: '🍽️',
      path: '/admin/content?page=menu'
    },
    {
      title: 'About Page',
      description: 'Modify story, values, and atmosphere images',
      icon: 'ℹ️',
      path: '/admin/content?page=about'
    },
    {
      title: 'Contact Page',
      description: 'Update contact information and hero image',
      icon: '📞',
      path: '/admin/content?page=contact'
    },
    {
      title: 'Special Dishes',
      description: 'Manage special dish images and content',
      icon: '⭐',
      path: '/admin/content?page=specials'
    },
    {
      title: 'Gallery Images',
      description: 'Manage outdoor, indoor, and food gallery images',
      icon: '🖼️',
      path: '/admin/content?page=gallery'
    },
    {
      title: 'Translations',
      description: 'Edit text in English and German languages',
      icon: '🌐',
      path: '/admin/translations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Content Management System</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome, Admin! 👋</h2>
          <p className="text-lg opacity-90">
            Manage your restaurant website content from here. Click on any section below to start editing.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📄</div>
            <div className="text-2xl font-bold text-gray-800">7</div>
            <div className="text-sm text-gray-600">Editable Sections</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">🖼️</div>
            <div className="text-2xl font-bold text-gray-800">30+</div>
            <div className="text-sm text-gray-600">Manageable Images</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">✏️</div>
            <div className="text-2xl font-bold text-gray-800">50+</div>
            <div className="text-sm text-gray-600">Editable Text Fields</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-2xl font-bold text-gray-800">2</div>
            <div className="text-sm text-gray-600">Languages (EN/DE)</div>
          </div>
        </div>

        {/* Content Sections */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Content Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                to={section.path}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-4xl mb-4">{section.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{section.title}</h4>
                <p className="text-sm text-gray-600">{section.description}</p>
                <div className="mt-4 text-amber-600 font-semibold text-sm">
                  Edit Content →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/content"
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold"
            >
              Edit All Content
            </Link>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all content to defaults?')) {
                  localStorage.removeItem('siteContent');
                  window.location.reload();
                }
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
