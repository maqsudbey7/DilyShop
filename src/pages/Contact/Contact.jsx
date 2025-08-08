import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar } from "react-icons/fa";

const Contact = () => {
  const [rating, setRating] = useState(0);
    let { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert(t("RateUs"));
      return;
    }

    // Hozircha faqat consolda chiqaramiz
    console.log("Submitted Data:", { ...formData, rating });

    // Tozalash
    setFormData({ name: '', number: '', message: '' });
    setRating(0);
    alert(t("Thankyouforyourfeedback"));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className=' bg-white flex flex-col items-center justify-center px-4 py-12'>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>{t("Leaveareview")}</h1>

      <div className='flex gap-1 text-yellow-500 mb-6 cursor-pointer'>
        {[...Array(5)].map((_, index) => {
          const current = index + 1;
          return (
            <FaStar
              key={index}
              size={28}
              onClick={() => setRating(current)}
              className={current <= rating ? 'text-yellow-500' : 'text-gray-300'}
            />
          );
        })}
      </div>

      {/* Forma */}
      <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-gray-50 p-8 rounded-xl shadow space-y-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>{t('Name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='John'
              required
              className='w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>{t("Number")}</label>
            <input
              type="number"
              name="number"
              value={formData.email}
              onChange={handleChange}
              placeholder='+998'
              required
              className='w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='text-lg font-semibold text-gray-700 mb-2'>{t("YourReview")}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            placeholder='Message....'
            className='w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          ></textarea>
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200'
          >
            {t("Send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
