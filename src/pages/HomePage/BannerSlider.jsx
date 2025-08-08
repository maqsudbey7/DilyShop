import React from 'react';
import Slider from 'react-slick';
import iphone1 from '../../../public/image 172.png';
import iphone2 from '../../../public/Frame 78 (1).png';
import { motion } from "framer-motion";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const textVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};

const imageVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};
const BannerSlider = () => {
  let { t } = useTranslation()


  const slides = [
    {
      id: 1,
      title: t('DiscountsFrom'),
      subtitle: t("OnSamsungSmartphones"),
      image: iphone1
    },
    {
      id: 2,
      title: t("SummerDiscounts"),
      subtitle: "Ipad Pro ",
      image: iphone2
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="w-full bg-gradient-to-r from-[#fff2e2] to-[#e7fff8]">
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <Slider {...settings}>
          {slides.map(slide => (
            <div key={slide.id}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left */}
                <motion.div
                  className="flex-1 text-center md:text-left space-y-4"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
                    {slide.title} <span className="text-green-600">Dily</span>
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">
                    {slide.subtitle}
                  </h2>
                  <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-all">
                    {t('LearnMore')}
                  </button>
                </motion.div>

                {/* Right (Image) */}
                <motion.div
                  className="flex-1 flex justify-center"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src={slide.image}
                    alt="slide"
                    className="w-[70%] object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
};

export default BannerSlider;
