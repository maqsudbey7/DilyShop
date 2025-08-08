import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeFromCart, clearCart } from '../../store/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { BsCartX } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  // 🔐 Token yo'qligida savatni tozalash
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10">{t("Basket")}</h2>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20 bg-white rounded-xl shadow-lg"
        >
          <BsCartX className="text-6xl text-gray-300 mx-auto mb-6" />
          <p className="text-gray-600 text-lg mb-4">{t("Cartiscurrentlyempty")}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {t("GoBack")}
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* Cart Items */}
          <motion.div
            className="flex-1 space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-6 p-6 bg-white shadow-lg rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-lg"
                />

                <div className="flex-1">
                  <p className="text-gray-400 text-xs mb-1">{item.category}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-green-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementItem(item.id))}
                    className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    <FaMinus />
                  </button>

                  <span className="min-w-[24px] text-xl font-semibold text-center">
                    {item.count}
                  </span>

                  <button
                    onClick={() => dispatch(incrementItem(item.id))}
                    className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 ml-4"
                  title={t("Delete")}
                >
                  <FaTrashAlt />
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Panel */}
          <motion.div
            className="w-full lg:w-[30%] bg-white p-6 rounded-xl shadow-lg h-fit"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <label htmlFor="promo" className="block text-sm font-medium text-gray-600 mb-1">
                Promo kod:
              </label>
              <input
                id="promo"
                type="text"
                placeholder="Promo kod..."
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                {t("Application")}
              </button>
            </div>

            <div className="border-t pt-4 mt-6 text-sm text-gray-600">
              <div className="flex justify-between mb-2">
                <span>{t("Numberofproducts")}:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.count, 0)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>{t("Totalprice")}:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition text-lg"
            >
              {t("Formalization")}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
