import React from 'react';
import Slider from "react-slick";
import iphone2 from '../../../public/images (10).jpeg';
import iphone3 from '../../../public/images (13).jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';



const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#DADCDC] text-black/40 p-3 hover:text-white cursor-grab rounded-full z-10 hover:bg-[#00a74e]"
  >
    ❮
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#DADCDC] text-black/40 p-3 hover:text-white cursor-grab rounded-full z-10 hover:bg-[#00a74e]"
  >
    ❯
  </button>
);

const NewsGatjetHome = () => {
  let { t } = useTranslation()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };
  const slides = [
    {
      title: " iPhone 16",
      subtitle: t("Nowinnewcolors"),
      desc: t("Alreadyavailable"),
      image: iphone2
    },
    {
      title: "iPhone 13",
      subtitle: t("Acompletelynewexperience"),
      desc: t("Hurryupandbuy"),
      image: iphone3
    },
  ];

  return (
    <div className="relative mt-16 shadow rounded-2xl">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index}>
            <div className="flex px-[150px] flex-col lg:flex-row items-center justify-between rounded-2xl p-6 gap-6">
              {/* Text section */}
              <div className="flex flex-col gap-4 text-center lg:text-left max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-[#00C65E]">{item.title}</h1>
                <p className="text-lg md:text-xl font-semibold">{item.subtitle}</p>
                <small className="text-sm md:text-base">{item.desc}</small>
                <div className="flex justify-center lg:justify-start">
                  <NavLink to={'phones'} className="w-[159px] h-[41px] flex items-center justify-center transform duration-300 hover:scale-105 rounded-xl bg-[#00C65E] text-white text-sm">
                    {t('Buy')}
                  </NavLink>
                </div>
              </div>

              {/* Image section */}
              <div className="flex justify-center flex-shrink-0">
                <img
                  className="object-contain w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]"
                  src={item.image}
                  alt={`slide-${index}`}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsGatjetHome;
