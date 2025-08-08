import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const   CategorySelect = ({ categories, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-60">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-whit rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none flex justify-between items-center"
        >
          {selectedCategory ? selectedCategory : 'Select a category'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d={isOpen ? 'M6 15l6-6 6 6' : 'M19 9l-7 7-7-7'} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm cursor-pointer transition 
                    ${selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  {category}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelect;
