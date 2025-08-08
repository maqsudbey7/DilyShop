import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { FaHeart, FaRegHeart, FaTruckMoving } from 'react-icons/fa';
import { addToCart, wishlists } from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PhoneDetail = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const wishlistItems = useSelector(state => state.cart.wishlist);
  const isLoggedIn = localStorage.getItem('token');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setPhone(data);
        setLoading(false);
      });
  }, [id]);

  const cartItems = useSelector((state) => state.cart.items);

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);
  const isAlreadyInCart = (phoneId) => cartItems.some(item => item.id === phoneId);

  const handleAddToCart = (phone) => {
    if (!isLoggedIn) {
      toast.error("Iltimos, mahsulot sotib olish uchun ro'yxatdan o'ting", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate('/register');
      return;
    }
    if (!selectedColor || !selectedSize) {
      toast.error("Iltimos, rang va o'lchamni tanlang!");
      return;
    }
    dispatch(addToCart({ ...phone, selectedColor, selectedSize }));
    toast.success(`${phone.title} savatga qo‘shildi`);
  };

  const WishList = (item) => {
    if (!isLoggedIn) {
      toast.error("Iltimos, yoqtirish uchun ro'yxatdan o'ting", {
        autoClose: 2000,
      });
      navigate('/register');
      return;
    }
    const isAlreadyInWishlist = wishlistItems.some(i => i.id === item.id);
    dispatch(wishlists(item));
    toast[isAlreadyInWishlist ? 'info' : 'success'](
      `${item.title} ${isAlreadyInWishlist ? 'yoqtirganlardan olib tashlandi' : 'yoqtirganlarga qo‘shildi'}`,
      { autoClose: 1500 }
    );
  };

  if (loading) return <p>Yuklanmoqda...</p>;
  if (!phone) return <p>Ma'lumot topilmadi</p>;

  return (
    <motion.div
      className='min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-10'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className='w-full max-w-6xl p-6 md:p-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-xl rounded-3xl flex flex-col md:flex-row gap-8 relative'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <button
          title='Ortga Qaytish'
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center text-2xl font-bold absolute top-4 right-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          <IoIosClose />
        </button>

        <div className='flex-1'>
          <img src={selectedImage || phone.thumbnail} alt="phone" className='w-full h-[360px] object-contain rounded-xl shadow-md' />

          {phone.images && (
            <div className='flex flex-wrap gap-3 mt-4 justify-center'>
              {phone.images.map((img, idx) => (
                <img
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className='w-16 h-16 rounded-lg border cursor-pointer hover:scale-105 transition duration-300 object-cover'
                  src={img}
                  alt={`thumb-${idx}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className='flex-1 flex flex-col gap-5'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white'>{phone.title}</h2>
          <p className='text-gray-600 dark:text-gray-300'>{phone.description}</p>

          <div className='flex gap-3'>
            {[64, 128, 256].map(size => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={`px-4 py-2 text-sm rounded-full border ${selectedSize === size ? 'bg-green-600 text-white' : 'bg-white text-gray-800'} shadow`}
              >
                {size} GB
              </button>
            ))}
          </div>

          <div className='flex items-center gap-3'>
            {['#CCEFDB', '#363A45', '#FFB762', '#C4C4C4'].map((color, i) => (
              <button
                key={i}
                onClick={() => handleColorSelect(color)}
                className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-green-500' : 'border-gray-300'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className='flex justify-between items-center text-lg mt-2'>
            <span className='font-semibold'>Narx:</span>
            <span className='text-2xl font-bold text-green-600'>${phone.price}</span>
          </div>

          <div className='flex items-center justify-between mt-3'>
            <div className='flex items-center gap-2'>
              <FaTruckMoving className='text-green-500' />
              <span className='text-sm text-gray-600'>Bepul yetkazib berish</span>
            </div>
            <button onClick={() => WishList(phone)}>
              {wishlistItems.some(item => item.id === phone.id) ? <FaHeart className='text-red-500 text-xl' /> : <FaRegHeart className='text-xl' />}
            </button>
          </div>

          <button
            disabled={isAlreadyInCart(phone.id)}
            onClick={() => handleAddToCart(phone)}
            className={`mt-4 w-full py-3 rounded-xl text-white font-semibold transition duration-300 ${isAlreadyInCart(phone.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isAlreadyInCart(phone.id) ? 'Savatda bor' : 'Savatga qo‘shish'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhoneDetail;