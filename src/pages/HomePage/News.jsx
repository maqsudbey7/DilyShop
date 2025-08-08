import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { addToCart, wishlists } from '../../store/cartSlice';
import { useFetch } from '../../hooks/UseFetch';
import Spinner from '../../components/Spinner/Spinner';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const News = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { t } = useTranslation()

  const [selectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

  const { data: gadgets, loading, error } = useFetch(
    'https://dummyjson.com/products/category/laptops?limit=4'
  );
  const wishlistItems = useSelector((state) => state.cart.wishlist);
  const isLoggedIn = !!localStorage.getItem('token');

  const filteredGadgets = gadgets.filter((item) => {
    const name = item.title?.toLowerCase() || '';
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error(t("PleaseRegisterToPurchaseTheProduct"), { autoClose: 2000 });
      return navigate('/register');
    }
    dispatch(addToCart(product));
    toast.success(`${product.title} ${t("Addedtocart")}`, { autoClose: 1500 });
  };

  const handleWishlistToggle = (product) => {
    if (!isLoggedIn) {
      toast.error(t("PleaseRegisterToLikeTheProduct"), { autoClose: 2000 });
      return navigate('/register');
    }

    const isAlreadyInWishlist = wishlistItems.some((i) => i.id === product.id);
    dispatch(wishlists(product));
    toast[isAlreadyInWishlist ? 'info' : 'success'](
      `${product.title} ${isAlreadyInWishlist ? t('RemovedFromFavorites') : t('AddedToFavorites')}`,
      { autoClose: 1500 }
    );
  };
const cardVariants = {
  hidden: { opacity: 0, y: 50, x: -50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: 'spring'
    }
  })
};


  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50">
      {loading && (
        <div className="text-center text-gray-500">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 mt-4">
          Xatolik yuz berdi: {error}
        </div>
      )}
      <h1 className='text-4xl font-semibold my-2'>{t("NewArrials")}</h1>
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGadgets.length === 0 ? (
            <p className="text-red-500 text-center mx-auto mt-10 text-lg">
              ❌ {t("ProductNotFound")}
            </p>
          ) : (
            filteredGadgets.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="group rounded-xl mt-6 border border-gray-200 bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative"
              >
                {/* Wishlist icon (top-right) */}


                {/* Product Image with Hover View */}
                <NavLink
                  to={`/gadgets/${product.id}`}
                  className="relative aspect-video p-4 flex items-center justify-center bg-white"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium text-sm md:text-base">
                      {t("View")}
                    </span>
                  </div>
                </NavLink>
                <div className="p-4">
                  <h2 className="font-medium text-gray-900 text-base mb-1 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </p>

                  {/* 👇 Bu joyga footer qismni joylashtiring */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="text-xl text-gray-400 hover:text-red-500 transition"
                    >
                      {wishlistItems.some(item => item.id === product.id)
                        ? <FaHeart className="text-red-500" />
                        : <FaRegHeart />}
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-black text-white py-2 px-8 rounded-md text-sm hover:bg-gray-800 transition"
                    >
                      {t("AddedToCart")}
                    </button>
                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default News;
