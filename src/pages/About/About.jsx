import React from "react";
import { motion } from "framer-motion";
import accessory3 from '../../../public/best-iphone-accessories-of-2024.avif';
import accessory2 from '../../../public/photo-1624823183493-ed5832f48f18.avif';
import accessory1 from '../../../public/photo-1678852524356-08188528aed9.avif';
import { useTranslation } from "react-i18next";

const About = () => {
    const images = [accessory1, accessory2, accessory3];
  let { t } = useTranslation()

    const founders = [
        {
            name: "Murodjon Karimov",
            role: "CEO & Founder",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Gulnoza Tursunova",
            role: "Co-Founder & Creative Director",
            img: "https://randomuser.me/api/portraits/women/45.jpg",
        },
        {
            name: "Sherzod Akmalov",
            role: "Operations Manager",
            img: "https://randomuser.me/api/portraits/men/58.jpg",
        },
    ];

    return (
        <div className="bg-white py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            {/* Sarlavha */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10"
            >
           {t("AboutUs")}
            </motion.h2>

            {/* Asosiy bo‘lim */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Rasmlar */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {images.map((img, index) => (
                        <motion.img
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            src={img}
                            alt="Accessory"
                            className={`rounded-2xl object-cover shadow-xl ${index === 2 ? "col-span-2" : ""}`}
                        />
                    ))}
                </motion.div>

                {/* Ma’lumotlar */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t("TechThatComplementsYourLifestyle")}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        <strong className="text-gray-800">Tech Access</strong> — {t("TechAccesText1")}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">{t("TechAccesText2")}</p>
                    <p className="text-gray-600 leading-relaxed mb-4">{t("TechAccesText3")}</p>
                    <p className="text-blue-600 font-semibold">{t("FeelTheTechnologyWithUs")}💙</p>
                </motion.div>
            </div>

            {/* Afzalliklar */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {[
                    {
                        icon: "🚀",
                        title: t("FastDelivery"),
                        desc: t("FastDeliveryText"),
                    },
                    {
                        icon: "🔒",
                        title:  t("QualityGuarantee"),
                        desc: t("QualityGuaranteeText"),
                    },
                    {
                        icon: "💬",
                        title: t("FriendlySupport"),
                        desc: t("FriendlySupportText"),
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        className="p-6 bg-gray-50 rounded-xl shadow-lg text-center"
                    >
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Asoschilar */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-24"
            >
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">{t("Founders")}</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {founders.map((founder, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-50 p-6 rounded-2xl shadow-md text-center"
                        >
                            <img
                                src={founder.img}
                                alt={founder.name}
                                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                            />
                            <h4 className="text-xl font-semibold text-gray-800">{founder.name}</h4>
                            <p className="text-gray-500">{founder.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
