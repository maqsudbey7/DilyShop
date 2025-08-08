import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart?.items || []);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [form, setForm] = useState({
    city: '',
    date: '',
    time: '',
    address: '',
    apartment: '',
    comment: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
  });

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.count, 0);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    alert(t("Ordersent"));
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-6 relative bg-white shadow-xl rounded-xl space-y-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='text-sm  absolute top-1 right-2'>{t("Thepageisincomplete")}</h1>
      <h2 className="text-2xl font-bold text-gray-800 text-center">{t("ProceedtoCheckout")}</h2>

      {/* Order Summary */}
      <motion.div
        className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-green-700">{t("OrderSummary")}</h3>
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm text-gray-700 border-b pb-1">
            <span>{item.title} × {item.count}</span>
            <span>${(item.price * item.count).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between text-base font-semibold pt-2 text-gray-800">
          <span>{t("Total")}:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </motion.div>

      {/* Delivery Method */}
      <motion.div
        className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-green-700">{t("DeliveryMethod")}</h3>
        <div className="flex gap-3">
          <button
            className={`px-4 py-1.5 rounded-lg text-sm transition ${deliveryType === 'delivery' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            onClick={() => setDeliveryType('delivery')}
          >
            {t("DeliveryAddress")}
          </button>
          <button
            className={`px-4 py-1.5 rounded-lg text-sm transition ${deliveryType === 'pickup' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            onClick={() => setDeliveryType('pickup')}
          >
            {t("StorePickup")}
          </button>
        </div>

        {deliveryType === 'delivery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="Shahar" className="border p-2 rounded-md text-sm" />
            <input name="date" value={form.date} onChange={handleChange} type="date" className="border p-2 rounded-md text-sm" />
            <input name="time" value={form.time} onChange={handleChange} type="time" className="border p-2 rounded-md text-sm" />
            <input name="address" value={form.address} onChange={handleChange} type="text" placeholder="Ko‘cha / uy raqami" className="border p-2 rounded-md text-sm" />
            <input name="apartment" value={form.apartment} onChange={handleChange} type="text" placeholder="Kvartira" className="border p-2 rounded-md text-sm" />
            <input name="comment" value={form.comment} onChange={handleChange} type="text" placeholder="Izoh (ixtiyoriy)" className="md:col-span-2 border p-2 rounded-md text-sm" />
          </div>
        )}
      </motion.div>

      {/* Payment Method */}
      <motion.div
        className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-green-700">{t("PaymentMethod")}</h3>
        <div className="flex flex-wrap gap-3">
          {['card', 'installment', 'cash', 'wallet'].map(method => (
            <button
              key={method}
              className={`px-4 py-1.5 rounded-lg text-sm transition ${paymentMethod === method ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              onClick={() => setPaymentMethod(method)}
            >
              {{
                card: t("PaybyCardOnline"),
                installment: t("Installmentpaymentavailable"),
                cash: t("CashPayment"),
                wallet: t("DigitalWallet"),
              }[method]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Customer Info */}
      <motion.div
        className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-green-700">{t("CustomerInformation")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Ism" className="border p-2 rounded-md text-sm" />
          <input name="surname" value={form.surname} onChange={handleChange} type="text" placeholder="Familiya" className="border p-2 rounded-md text-sm" />
          <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Telefon" className="border p-2 rounded-md text-sm" />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 rounded-md text-sm" />
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-sm font-semibold transition-all"
        onClick={handleCheckout}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
      >
        {t("StartCheckout")}
      </motion.button>
    </motion.div>
  );
};

export default CheckoutPage;
