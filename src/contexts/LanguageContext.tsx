import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Landing
    'landing.title': 'Rural Healthcare Made Simple',
    'landing.subtitle': 'Quality healthcare accessible from anywhere, even on slow connections',
    'landing.login': 'Login with Phone',
    'landing.trust.prefix': 'Trusted public service platform under',
    'landing.trust.mission': 'Ayushman Bharat Digital Mission',
    'landing.trust.suffix': 'Accessible on low bandwidth.',
    
    // Auth
    'auth.phoneNumber': 'Phone Number',
    'auth.enterPhone': 'Enter your phone number',
    'auth.sendOTP': 'Send OTP',
    'auth.enterOTP': 'Enter OTP',
    'auth.verify': 'Verify',
    'auth.resend': 'Resend OTP',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.symptomCheck': 'Symptom Check',
    'dashboard.doctorConnect': 'Doctor Connect',
    'dashboard.prescriptions': 'Prescriptions',
    'dashboard.appointment': 'Book Appointment',
    'dashboard.dosage': 'Dosage Tracker',
    'dashboard.logout': 'Logout',
    
    // Features
    'symptom.title': 'Symptom Checker',
    'symptom.select': 'Select affected area',
    'consult.title': 'Doctor Connect',
    'prescription.title': 'My Prescriptions',
    'appointment.title': 'Book Appointment',
    'dosage.title': 'Dosage Tracker',
  },
  kn: {
    // Landing
    'landing.title': 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಸೇವೆ ಸುಲಭವಾಗಿ',
    'landing.subtitle': 'ನಿಧಾನ ಇಂಟರ್ನೆಟ್‌ನಲ್ಲೂ ಎಲ್ಲಿಂದಲಾದರೂ ಗುಣಮಟ್ಟದ ಆರೋಗ್ಯ ಸೇವೆ',
    'landing.login': 'ಫೋನ್ ನಂಬರ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್',
    'landing.trust.prefix': 'ವಿಶ್ವಾಸಾರ್ಹ ಸಾರ್ವಜನಿಕ ಸೇವಾ ವೇದಿಕೆ –',
    'landing.trust.mission': 'ಅಯುಷ್ಮಾನ್ ಭಾರತ ಡಿಜಿಟಲ್ ಮಿಷನ್',
    'landing.trust.suffix': 'ಅಡಿಯಲ್ಲಿ. ಕಡಿಮೆ ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್‌ನಲ್ಲೂ ಲಭ್ಯ.',
    
    // Auth
    'auth.phoneNumber': 'ಫೋನ್ ನಂಬರ್',
    'auth.enterPhone': 'ನಿಮ್ಮ ಫೋನ್ ನಂಬರ್ ನಮೂದಿಸಿ',
    'auth.sendOTP': 'OTP ಕಳುಹಿಸಿ',
    'auth.enterOTP': 'OTP ನಮೂದಿಸಿ',
    'auth.verify': 'ಪರಿಶೀಲಿಸಿ',
    'auth.resend': 'OTP ಮರು ಕಳುಹಿಸಿ',
    
    // Dashboard
    'dashboard.welcome': 'ಸ್ವಾಗತ',
    'dashboard.symptomCheck': 'ಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
    'dashboard.doctorConnect': 'ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕ',
    'dashboard.prescriptions': 'ಔಷಧಿ ಪಟ್ಟಿ',
    'dashboard.appointment': 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್',
    'dashboard.dosage': 'ಔಷಧಿ ಟ್ರ್ಯಾಕರ್',
    'dashboard.logout': 'ಲಾಗ್ ಔಟ್',
    
    // Features
    'symptom.title': 'ಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
    'symptom.select': 'ಬಾಧಿತ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'consult.title': 'ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕ',
    'prescription.title': 'ನನ್ನ ಔಷಧಿ ಪಟ್ಟಿ',
    'appointment.title': 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್',
    'dosage.title': 'ಔಷಧಿ ಟ್ರ್ಯಾಕರ್',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('kn');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'en' || stored === 'kn')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
