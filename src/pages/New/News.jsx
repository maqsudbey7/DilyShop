import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../../../public/download.jpeg'
import img2 from '../../../public/images.jpeg'
import img3 from '../../../public/download (1).jpeg'
import { useTranslation } from 'react-i18next';



const News = () => {
  let { t } = useTranslation()

  const newsItems = [
    {
      id: 1,
      title: t("ThenewiPhone16"),
      date: "2025-08-01",
      description: t("ThenewiPhone16Text"),
      image: img3
    },
    {
      id: 2,
      title: t("SamsungGalaxyZFold6isnowavailable"),
      date: "2025-07-28",
      description: t("ZFlipText"),
      image: img1
    },
    {
      id: 3,
      title: t("TheMacBook"),
      date: "2025-07-20",
      description: t("TheMacBookText"),
      image: img2
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">{t("News")}</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={item.image} alt={item.title} className="h-48 w-full object-contain" />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{new Date(item.date).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;
