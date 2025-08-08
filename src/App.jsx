import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from './store/authSlice';
import AppRoutes from './routes/AppRoutes';
import { initReactI18next } from 'react-i18next';
import translationEn from './locale/translationEn';
import translationUz from './locale/translationUz';
import i18n from 'i18next';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import BackToTop from './components/BackToTop/BackToTop'; // ⬅️ Qo‘shildi

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    uz: { translation: translationUz }
  },
  lng: "en",
  fallbackLng: "en"
});

const App = () => {
  const dispatch = useDispatch();
  const [showWelcome, setShowWelcome] = useState(false);

  const changeLang = (value) => {
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("isLoggedIn");
    if (savedStatus === "true") {
      dispatch(setIsLoggedIn(true));
    }

    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  return (
    <div className="bg-white relative">
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      <AppRoutes changeLang={changeLang} />
      <BackToTop /> 
      <ToastContainer />
    </div>
  );
};

export default App;
