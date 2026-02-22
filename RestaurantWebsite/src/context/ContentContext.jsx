import { createContext, useContext, useState, useEffect } from 'react';

// Default content structure
const defaultContent = {
  home: {
    hero: {
      title: "home_welcome",
      subtitle: "home_subtitle",
      tagline: "home_tagline",
      buttonText: "home_discover_menu",
      backgroundImage: "/src/Images/View.jpg"
    },
    philosophy: {
      title: "home_our_philosophy",
      text: "home_philosophy_text",
      image1: "/src/Images/German1.jpg",
      image2: "/src/Images/German2.jpg",
      buttonText: "home_learn_more"
    }
  },
  menu: {
    hero: {
      title: "heroTitleMain",
      subtitle: "heroTitleSub",
      text: "heroText",
      backgroundImage: "/src/Images/bgImg.jpg"
    }
  },
  about: {
    hero: {
      title: "about_hero_title",
      subtitle: "about_hero_subtitle",
      tagline: "about_hero_tagline",
      backgroundImage: "/BGIMG.jpg"
    },
    story: {
      title: "about_story_title",
      text: "about_story_text"
    },
    atmosphere: {
      image1: "/Platter.jpg",
      image2: "/Platter2.jpg"
    }
  },
  contact: {
    hero: {
      title: "contact_hero_title",
      subtitle: "contact_hero_subtitle",
      tagline: "contact_hero_tagline",
      backgroundImage: "/Contact.jpg"
    }
  },
  specials: {
    images: [
      "/gallery/food/food2.jpeg",
      "/gallery/food/food4.jpeg",
      "/gallery/food/food5.jpeg",
      "/gallery/food/food6.jpeg"
    ]
  },
  gallery: {
    outdoor: [
      "/gallery/outdoor/1.jpeg",
      "/gallery/outdoor/2.jpeg",
      "/gallery/outdoor/3.jpeg",
      "/gallery/outdoor/4.jpeg"
    ],
    indoor: [
      "/gallery/indoor/1.jpeg",
      "/gallery/indoor/2.jpeg",
      "/gallery/indoor/3.jpeg",
      "/gallery/indoor/4.jpeg",
      "/gallery/indoor/5.jpeg",
      "/gallery/indoor/6.jpeg"
    ],
    food: [
      "/gallery/food/food1.jpeg",
      "/gallery/food/food2.jpeg",
      "/gallery/food/food3.jpeg",
      "/gallery/food/food4.jpeg",
      "/gallery/food/food5.jpeg",
      "/gallery/food/food6.jpeg"
    ]
  }
};

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [translations, setTranslations] = useState(() => {
    // Load custom translations from localStorage
    const saved = localStorage.getItem('siteTranslations');
    return saved ? JSON.parse(saved) : { en: {}, de: {} };
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  // Save translations to localStorage
  useEffect(() => {
    localStorage.setItem('siteTranslations', JSON.stringify(translations));
  }, [translations]);

  const updateContent = (path, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const updateTranslation = (language, key, value) => {
    setTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [key]: value
      }
    }));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('siteContent', JSON.stringify(defaultContent));
  };

  const resetTranslations = () => {
    setTranslations({ en: {}, de: {} });
    localStorage.removeItem('siteTranslations');
  };

  const getContent = (path) => {
    const keys = path.split('.');
    let current = content;
    
    for (const key of keys) {
      if (current[key] === undefined) return null;
      current = current[key];
    }
    
    return current;
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      resetContent, 
      getContent,
      translations,
      updateTranslation,
      resetTranslations
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

export default ContentContext;
