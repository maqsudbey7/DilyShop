import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaTruckMoving } from 'react-icons/fa';
import { addToCart, wishlists } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const GadgetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    let { t } = useTranslation()
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.cart.wishlist);
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  console.log(product)
  const isAlreadyInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error(t("PleaseRegisterToPurchaseTheProduct"), {
        position: "top-right",
        autoClose: 1500,
      });
      navigate('/register');
      return;
    }

    if ((product.colors && !selectedColor) || (product.sizes && !selectedSize)) {
      toast.error(t("PleaseSelectAColorAndSize"), {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    const itemToAdd = {
      ...product,
      selectedColor,
      selectedSize,
    };

    dispatch(addToCart(itemToAdd));
    toast.success(`${product.title} ${t("Addedtocart")}`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleWishlist = () => {
    const isAlready = wishlistItems.some((i) => i.id === product.id);
    dispatch(wishlists(product));
    toast[isAlready ? 'info' : 'success'](
      `${product.title} ${isAlready ? t('RemovedFromFavorites') : t('AddedToFavorites')}`,
      { position: "top-right", autoClose: 1500 }
    );
  };

  if (loading) return <p>Yuklanmoqda...</p>;
  if (!product) return <p>Ma'lumot topilmadi</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex flex-col gap-2 p-4 md:p-6 font-[Poppins] relative'
    >
      <h1 className='text-2xl font-semibold text-center md:text-left'>{product.title}</h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate(-1)}
        className="w-7 h-7 flex items-center justify-center text-3xl font-bold absolute top-5 right-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        <IoIosClose />
      </motion.button>

      <div className='flex flex-col md:flex-row items-center md:items-start justify-around gap-4'>
        {/* LEFT */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='flex flex-col md:flex-row gap-4'
        >
          <div className='w-full md:w-[370px]'>
            <motion.img
              src={selectedImage || product.thumbnail}
              alt=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-[300px] md:h-[460px] object-contain"
            />

            <div className='flex flex-wrap items-center justify-center gap-2 mt-2'>
              {product.images?.map((img, idx) => (
                <motion.img
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedImage(img)}
                  className='w-20 h-20 p-2 shadow-2xl rounded-md cursor-pointer'
                  src={img}
                  alt={`product-${idx}`}
                />
              ))}
            </div>
          </div>

          {/* CHARACTERISTICS */}
          <div className='flex flex-col gap-4 mt-4 md:mt-12'>
            {product.size && (
              <div className='flex items-center gap-3 flex-wrap'>
                {[64, 128, 256].map(size => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedSize(size)}
                    className={`text-sm px-4 py-2 rounded-md border ${selectedSize === size ? 'bg-green-500 text-white' : 'bg-white'} shadow`}
                  >
                    {size} GB
                  </motion.button>
                ))}
              </div>
            )}

            {product.colors && (
              <div>
                <p className='font-medium'>Colors</p>
                <div className="flex gap-2">
                  {['#000000', '#FF0000', '#00FF00', '#0000FF'].map((color, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-green-500' : 'border-gray-400'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT: Buy block */}
        <div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='w-full md:w-[300px]'
          >
            <div className='flex flex-col gap-6 p-4 md:p-6 shadow-lg rounded-md'>
              <p className='flex items-center justify-between text-lg'>
                {t("Price")} : <span className='text-2xl font-semibold'>{product.price}$</span>
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-sm'>
                  <span>{t("Delivery")}</span>
                  <FaTruckMoving className='text-green-500 text-lg' />
                </div>

                <div className='flex items-center gap-2 text-sm'>
                  <span>{t("ToFavorites")}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    className="text-md cursor-pointer"
                  >
                    {wishlistItems.some(item => item.id === product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={isAlreadyInCart(product.id)}
                onClick={() => handleAddToCart(product)}
                className={`px-4 py-2 rounded-md ${isAlreadyInCart(product.id) ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
              >
                {isAlreadyInCart(product.id) ? t("AlreadyInTheCart") : t("AddtoCart")}
              </motion.button>
            </div>
          </motion.div>

          <div className='flex flex-col items-start gap-2 mt-6'>
            <p className='text-xl'>{product.title}</p>
            <p className='text-xl'>{product.price} $</p>
            <p>{product.brand}</p>
            <span className='w-[300px] text-md'>{product.description}</span>
          </div>
        </div>


      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-white p-4 rounded-md shadow-lg max-w-[90%] max-h-[90%]'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <img
                src={selectedImage}
                alt='modal-img'
                className='max-w-full max-h-[60vh] object-contain rounded'
              />
              <button
                className='mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                onClick={() => setSelectedImage(null)}>
                Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



    </motion.div>
  );
};

export default GadgetDetail;
