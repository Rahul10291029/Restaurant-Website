import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const ContentEditor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { content, updateContent, resetContent, translations, updateTranslation, resetTranslations } = useContent();
  const [activeTab, setActiveTab] = useState(searchParams.get('page') || 'home');
  const [hasChanges, setHasChanges] = useState(false);

  const handleImageUpload = (path, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent(path, reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (path, value) => {
    updateContent(path, value);
    setHasChanges(true);
  };

  const handleTranslationChange = (lang, key, value) => {
    updateTranslation(lang, key, value);
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      resetContent();
      resetTranslations();
      setHasChanges(false);
      alert('Content reset to defaults!');
    }
  };

  const renderImageEditor = (label, path, currentValue) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {currentValue && (
            <img
              src={currentValue}
              alt={label}
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
            />
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(path, e)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
          <p className="mt-1 text-xs text-gray-500">Upload a new image (JPG, PNG, WebP)</p>
        </div>
      </div>
    </div>
  );

  const renderTextEditor = (label, path, currentValue, multiline = false) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={currentValue || ''}
          onChange={(e) => handleTextChange(path, e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      ) : (
        <input
          type="text"
          value={currentValue || ''}
          onChange={(e) => handleTextChange(path, e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const renderGalleryContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Outdoor Gallery (4 images)</h3>
        <div className="grid grid-cols-2 gap-4">
          {content.gallery.outdoor.map((img, index) => (
            <div key={index}>
              {renderImageEditor(`Outdoor Image ${index + 1}`, `gallery.outdoor.${index}`, img)}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Indoor Gallery (6 images)</h3>
        <div className="grid grid-cols-2 gap-4">
          {content.gallery.indoor.map((img, index) => (
            <div key={index}>
              {renderImageEditor(`Indoor Image ${index + 1}`, `gallery.indoor.${index}`, img)}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Food Gallery (6 images)</h3>
        <div className="grid grid-cols-2 gap-4">
          {content.gallery.food.map((img, index) => (
            <div key={index}>
              {renderImageEditor(`Food Image ${index + 1}`, `gallery.food.${index}`, img)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTranslationsContent = () => {
    const commonKeys = [
      'home_welcome', 'home_subtitle', 'home_tagline', 'home_our_philosophy', 'home_philosophy_text',
      'about_hero_title', 'about_hero_subtitle', 'about_story_title', 'about_story_text',
      'contact_hero_title', 'contact_hero_subtitle', 'footer_title', 'footer_description'
    ];

    return (
      <div className="space-y-8">
        <div className="bg-amber-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Edit text translations for both English and German. Changes will be reflected across the website.
          </p>
        </div>

        {commonKeys.map((key) => (
          <div key={key} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-md font-bold text-gray-800 mb-4">{key}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🇬🇧 English
              </label>
              <textarea
                value={translations.en[key] || ''}
                onChange={(e) => handleTranslationChange('en', key, e.target.value)}
                rows="2"
                placeholder="Enter English translation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🇩🇪 German (Deutsch)
              </label>
              <textarea
                value={translations.de[key] || ''}
                onChange={(e) => handleTranslationChange('de', key, e.target.value)}
                rows="2"
                placeholder="Enter German translation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHomeContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Hero Section</h3>
        {renderImageEditor('Background Image', 'home.hero.backgroundImage', content.home.hero.backgroundImage)}
        {renderTextEditor('Title', 'home.hero.title', content.home.hero.title)}
        {renderTextEditor('Subtitle', 'home.hero.subtitle', content.home.hero.subtitle)}
        {renderTextEditor('Tagline', 'home.hero.tagline', content.home.hero.tagline, true)}
        {renderTextEditor('Button Text', 'home.hero.buttonText', content.home.hero.buttonText)}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Philosophy Section</h3>
        {renderTextEditor('Title', 'home.philosophy.title', content.home.philosophy.title)}
        {renderTextEditor('Description', 'home.philosophy.text', content.home.philosophy.text, true)}
        {renderImageEditor('Image 1', 'home.philosophy.image1', content.home.philosophy.image1)}
        {renderImageEditor('Image 2', 'home.philosophy.image2', content.home.philosophy.image2)}
        {renderTextEditor('Button Text', 'home.philosophy.buttonText', content.home.philosophy.buttonText)}
      </div>
    </div>
  );

  const renderMenuContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Menu Hero Section</h3>
        {renderImageEditor('Background Image', 'menu.hero.backgroundImage', content.menu.hero.backgroundImage)}
        {renderTextEditor('Title', 'menu.hero.title', content.menu.hero.title)}
        {renderTextEditor('Subtitle', 'menu.hero.subtitle', content.menu.hero.subtitle)}
        {renderTextEditor('Description', 'menu.hero.text', content.menu.hero.text, true)}
      </div>
    </div>
  );

  const renderAboutContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Hero Section</h3>
        {renderImageEditor('Background Image', 'about.hero.backgroundImage', content.about.hero.backgroundImage)}
        {renderTextEditor('Title', 'about.hero.title', content.about.hero.title)}
        {renderTextEditor('Subtitle', 'about.hero.subtitle', content.about.hero.subtitle)}
        {renderTextEditor('Tagline', 'about.hero.tagline', content.about.hero.tagline, true)}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Story Section</h3>
        {renderTextEditor('Title', 'about.story.title', content.about.story.title)}
        {renderTextEditor('Story Text', 'about.story.text', content.about.story.text, true)}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Atmosphere Images</h3>
        {renderImageEditor('Image 1', 'about.atmosphere.image1', content.about.atmosphere.image1)}
        {renderImageEditor('Image 2', 'about.atmosphere.image2', content.about.atmosphere.image2)}
      </div>
    </div>
  );

  const renderContactContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Hero Section</h3>
        {renderImageEditor('Background Image', 'contact.hero.backgroundImage', content.contact.hero.backgroundImage)}
        {renderTextEditor('Title', 'contact.hero.title', content.contact.hero.title)}
        {renderTextEditor('Subtitle', 'contact.hero.subtitle', content.contact.hero.subtitle)}
        {renderTextEditor('Tagline', 'contact.hero.tagline', content.contact.hero.tagline, true)}
      </div>
    </div>
  );

  const renderSpecialsContent = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Special Dishes Images</h3>
        {content.specials.images.map((img, index) => (
          <div key={index}>
            {renderImageEditor(`Special Dish ${index + 1}`, `specials.images.${index}`, img)}
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'menu', label: 'Menu', icon: '🍽️' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'specials', label: 'Specials', icon: '⭐' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Content Editor</h1>
              <p className="text-sm text-gray-600">Edit images, text, and translations</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                ← Dashboard
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Reset All
              </button>
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  hasChanges
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasChanges}
              >
                {hasChanges ? 'Save Changes ✓' : 'No Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && renderHomeContent()}
        {activeTab === 'menu' && renderMenuContent()}
        {activeTab === 'about' && renderAboutContent()}
        {activeTab === 'contact' && renderContactContent()}
        {activeTab === 'specials' && renderSpecialsContent()}
        {activeTab === 'gallery' && renderGalleryContent()}
      </div>
    </div>
  );
};

export default ContentEditor;
