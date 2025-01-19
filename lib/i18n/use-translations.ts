'use client';

import { useState, useEffect } from 'react';
import { translations } from './translations';

type Language = 'en' | 'ne';

export function useTranslations() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const setNewLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return {
    t: translations[language],
    language,
    setLanguage: setNewLanguage,
  };
}