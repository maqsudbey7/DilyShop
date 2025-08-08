import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const WelcomeIntro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="cloud cloud1" />
          <div className="cloud cloud2" />
          <div className="cloud cloud3" />

          <motion.h1
            className="welcome-text"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Sayt Test rejimida
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeIntro;
