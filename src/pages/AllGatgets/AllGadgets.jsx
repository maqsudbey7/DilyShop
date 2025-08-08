import React, { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // ✅ ADD THIS

import { wishlists, addToCart } from '../../store/cartSlice';
import { useFetch } from '../../hooks/UseFetch';
import CategorySelect from '../../components/CategorySelect/CategorySelect ';
import Search from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const AllGadgets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { t } = useTranslation()


  const [selectedCategory, setSelectedCategory] = useState(t("All"));
  const [searchTerm, setSearchTerm] = useState('');

  const { data: gadgets, loading, error } = useFetch('https://dummyjson.com/products');
  const wishlistItems = useSelector(state => state.cart.wishlist);
  const isLoggedIn = !!localStorage.getItem('token');

  const categories = [t("All"), ...new Set(gadgets.map(item => item.category))];

  const filteredGadgets = gadgets.filter(item => {
    const name = item.title || '';
    const matchesCategory = selectedCategory === t("All") || item.category === selectedCategory;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error(t('PleaseRegisterToPurchaseTheProduct'), { autoClose: 2000 });
      return navigate('/register');
    }
    dispatch(addToCart(product));
    toast.success(`${product.title} ${t("Addedtocart")}`, { autoClose: 1500 });
  };

  const handleWishlistToggle = (product) => {
    if (!isLoggedIn) {
      toast.error(t('PleaseRegisterToLikeTheProduct'), { autoClose: 2000 });
      return navigate('/register');
    }

    const isAlreadyInWishlist = wishlistItems.some(i => i.id === product.id);
    dispatch(wishlists(product));

    toast[isAlreadyInWishlist ? 'info' : 'success'](
      `${product.title} ${isAlreadyInWishlist ? t('RemovedFromFavorites') : t('AddedToFavorites')}`,
      { autoClose: 1500 }
    );
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
      },
    }),
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">🔌 {t('AllGadgets')}</h1>

      {/* Filter Controls */}
      <div className="flex w-full items-center max-sm:flex-col max-sm:justify-center max-sm:items-center justify-between gap-4 px-4 mb-6">
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Loading and Error */}
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

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGadgets.length === 0 ? (
                 <p className="text-red-500 text-center mt-10 text-lg">❌ {t("ProductNotFound")}</p>
          ) : (
            filteredGadgets.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="rounded-xl border cursor-pointer border-gray-200 shadow hover:shadow-md transition-all duration-300 bg-white"
              >
                {/* Image */}
                <NavLink to={`/gadgets/${product.id}`}  className="relative p-4 flex justify-center items-center h-[180px] bg-gray-50 group">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hoverda chiqadigan "View" tugmasi */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium tracking-wide text-sm bg-black/50 px-4 py-1 rounded-full">
                      {t("View")}
                    </span>
                  </div>
                </NavLink>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-gray-800 font-medium text-base mb-1">{product.title}</h2>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-2">{product.description}</p>
                  <p className="text-lg font-bold text-black mb-4">${product.price}</p>

                  {/* Wishlist + Add to cart */}
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

export default AllGadgets;
