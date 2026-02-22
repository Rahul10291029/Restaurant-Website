import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import enTranslations from '../locales/en/translation.json';
import deTranslations from '../locales/de/translation.json';

const TranslationEditor = () => {
  const navigate = useNavigate();
  const [translations, setTranslations] = useState({
    en: { ...enTranslations },
    de: { ...deTranslations }
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all translation keys
  const allKeys = Object.keys(translations.en).filter(key => typeof translations.en[key] === 'string');

  // Filter keys based on search
  const filteredKeys = searchTerm
    ? allKeys.filter(key => 
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translations.en[key]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translations.de[key]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allKeys;

  const handleTranslationChange = (lang, key, value) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleDownload = (lang) => {
    const dataStr = JSON.stringify(translations[lang], null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translation_${lang}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadBoth = () => {
    handleDownload('en');
    setTimeout(() => handleDownload('de'), 100);
    alert('Translation files downloaded! Please replace the files in:\n\nsrc/locales/en/translation.json\nsrc/locales/de/translation.json\n\nThen restart the dev server.');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all translations to original values?')) {
      setTranslations({
        en: { ...enTranslations },
        de: { ...deTranslations }
      });
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Translation Editor</h1>
              <p className="text-sm text-gray-600">Edit text for English and German</p>
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
                onClick={handleDownloadBoth}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  hasChanges
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasChanges}
              >
                {hasChanges ? 'Download Files ⬇️' : 'No Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">How to use:</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Edit the translations below for English (🇬🇧) and German (🇩🇪)</li>
                  <li>Click "Download Files" to download both translation files</li>
                  <li>Replace the files in: <code className="bg-blue-100 px-1 rounded">src/locales/en/translation.json</code> and <code className="bg-blue-100 px-1 rounded">src/locales/de/translation.json</code></li>
                  <li>Restart your dev server to see changes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search translations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-600">
            Showing {filteredKeys.length} of {allKeys.length} translations
          </p>
        </div>

        {/* Translations List */}
        <div className="space-y-4">
          {filteredKeys.map((key) => (
            <div key={key} className="bg-white p-6 rounded-xl shadow-md">
              <div className="mb-4">
                <h3 className="text-sm font-mono text-gray-500 mb-2">{key}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🇬🇧 English
                  </label>
                  <textarea
                    value={translations.en[key] || ''}
                    onChange={(e) => handleTranslationChange('en', key, e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* German */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🇩🇪 German (Deutsch)
                  </label>
                  <textarea
                    value={translations.de[key] || ''}
                    onChange={(e) => handleTranslationChange('de', key, e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredKeys.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No translations found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationEditor;
