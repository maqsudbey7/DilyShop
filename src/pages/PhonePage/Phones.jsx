import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; 

import { useFetch } from '../../hooks/UseFetch';
import { addToCart, wishlists } from '../../store/cartSlice';
import CategorySelect from '../../components/CategorySelect/CategorySelect ';
import Search from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const PhonePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { t } = useTranslation()

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

  const { data: phones, loading, error } = useFetch('https://dummyjson.com/products/category/smartphones');

  const wishlistItems = useSelector(state => state.cart.wishlist);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t("All"));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhones, setFilteredPhones] = useState([]);
  const isLoggedIn = localStorage.getItem('token');

  const categories = [t("All"), ...new Set(phones.map(item => item.category))];

  // Filtering logic
  useEffect(() => {
    const filtered = phones.filter(p => {
      const matchesBrand = selectedBrand === '' || p.brand === selectedBrand;
      const matchesCategory = selectedCategory === t("All") || p.category === selectedCategory;
      const name = p.name || p.title || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesCategory && matchesSearch;
    });
    setFilteredPhones(filtered);
  }, [phones, selectedBrand, selectedCategory, searchTerm]);

  // Set brands when data is loaded
  useEffect(() => {
    if (phones.length) {
      const uniqueBrands = [...new Set(phones.map(p => p.brand))];
      setBrands(uniqueBrands);
      setFilteredPhones(phones);
    }
  }, [phones]);

  const handleAddToCart = (phone) => {
    if (!isLoggedIn) {
      toast.error(t('PleaseRegisterToPurchaseTheProduct'), { autoClose: 2000 });
      navigate('/register');
      return;
    }

    dispatch(addToCart(phone));
    toast.success(`${phone.title} ${t("Addedtocart")}`, { autoClose: 1500 });
  };

  const toggleWishlist = (item) => {
    if (!isLoggedIn) {
      toast.error(t('PleaseRegisterToLikeTheProduct'), { autoClose: 2000 });
      navigate('/register');
      return;
    }

    const isInWishlist = wishlistItems.some(i => i.id === item.id);
    dispatch(wishlists(item));
    toast[isInWishlist ? "info" : "success"](
      `${item.title} ${isInWishlist ? t('RemovedFromFavorites') : t('AddedToFavorites')}`, {
      autoClose: 1500
    });
  };

  if (loading) return <div className="text-center text-gray-500"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center py-10">Xatolik: {error}</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">📱 {t("Phones")}</h1>

      <div className="flex w-full items-center max-sm:flex-col max-sm:justify-center max-sm:items-center justify-between gap-4 px-4 mb-6">
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredPhones.length === 0 && searchTerm.trim() !== '' ? (
        <p className="text-red-500 text-center mt-10 text-lg">❌ {t("ProductNotFound")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group rounded-xl border border-gray-200 bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Wishlist icon (top-right) */}


              {/* Product Image with Hover View */}
              <NavLink
                to={`/gadgets/${product.id}`}
                className="relative h-[180px] bg-gray-50 flex items-center justify-center group"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-full object-contain h-[180px] transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover View */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm bg-black/60 px-4 py-1 rounded-full">
                    {t('View')}
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
                    onClick={() => toggleWishlist(product)}
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


          ))}
        </div>
      )}
    </div>
  );
};

export default PhonePage;
