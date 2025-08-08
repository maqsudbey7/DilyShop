import React from 'react';
import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
      ></motion.div>
    </div>
  );
}
