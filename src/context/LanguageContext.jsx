// src/context/LanguageContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// Δημιουργούμε το Context με default value 'en'
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {}
});

export function LanguageProvider({ children }) {
  // Φορτώνουμε από localStorage ή επιλέγουμε 'en' ως default
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('appLanguage');
    return saved === 'el' ? 'el' : 'en';
  });

  // Κάθε φορά που αλλάζει το language, το σώζουμε στο localStorage
  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook για εύκολη πρόσβαση
export function useLanguage() {
  return useContext(LanguageContext);
}
