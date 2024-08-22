import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const country = response.data.country_code;
        
        // 여기에서 국가 코드에 따라 언어를 설정합니다.
        // 예시로 몇 가지 국가만 처리합니다.
        switch (country) {
          case 'KR':
            setLanguage('en');
            break;
          case 'JP':
            setLanguage('ja');
            break;
          default:
            setLanguage('en');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
        setLanguage('en'); // 에러 발생 시 기본값으로 영어 설정
      }
    };

    detectLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};