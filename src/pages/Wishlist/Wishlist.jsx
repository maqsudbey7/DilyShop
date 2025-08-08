import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addToCart, wishlists } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.cart.wishlist);
    const isLoggedIn = localStorage.getItem('token');
    const navigate = useNavigate();
      let { t } = useTranslation()
    
     

    const handleWishlistToggle = (item) => {
        const isAlreadyInWishlist = wishlistItems.some(i => i.id === item.id);
        dispatch(wishlists(item));
        if (isAlreadyInWishlist) {
            toast.info(`${item.title} ${t("RemovedFromFavorites")}`);
        }
    };

    const handleAddToCart = (item) => {
        if (!isLoggedIn) {
            toast.error(t("PleaseRegisterToPurchaseTheProduct"), {
                position: "top-right",
                autoClose: 2000
            });
            return;
        }
        dispatch(addToCart(item));
        toast.success(`${item.title} ${t("AddtoCart")}`, {
            position: "top-right",
            autoClose: 1500
        });
    };

    return (
        <div className="px-4 py-8">
            {wishlistItems.length === 0 ? (
                <div className='flex flex-col items-center gap-4 justify-center h-[300px]'>
                    <p className="text-center text-gray-500 text-lg">{t("FavoritesHead")}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-[150px] h-[50px] text-md p-3 px-6 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                    >
                        {t("GoBack")}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                    {wishlistItems.map((phone, index) => (
                        <motion.div
                            key={phone.id}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            className="rounded-xl border cursor-pointer border-gray-200 shadow hover:shadow-md transition-all duration-300 bg-white"
                        >
                            {/* Image + Link */}
                            <NavLink to={`/gadgets/${phone.id}`} className="relative p-4 flex justify-center items-center h-[180px] bg-gray-50 group">
                                <img
                                    src={phone.thumbnail}
                                    alt={phone.title}
                                    className="max-h-full h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-medium tracking-wide text-sm bg-black/50 px-4 py-1 rounded-full">
                                        {t("View")}
                                    </span>
                                </div>
                            </NavLink>

                            {/* Content */}
                            <div className="p-4">
                                <h2 className="text-gray-800 font-medium text-base mb-1">{phone.title}</h2>
                                <p className="text-sm text-gray-500 line-clamp-1 mb-2">{phone.description}</p>
                                <p className="text-lg font-bold text-black mb-4">${phone.price}</p>

                                {/* Wishlist + Add to cart */}
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => handleWishlistToggle(phone)}
                                        className="text-xl text-gray-400 hover:text-red-500 transition"
                                    >
                                        {wishlistItems.some(item => item.id === phone.id)
                                            ? <FaHeart className="text-red-500" />
                                            : <FaRegHeart />}
                                    </button>

                                    <button
                                        onClick={() => handleAddToCart(phone)}
                                        className="bg-black text-white py-2 px-8 rounded-md text-sm hover:bg-gray-800 transition"
                                    >
                                          {t("AddedToCart")}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
