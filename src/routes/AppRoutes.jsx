// AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import News from '../pages/New/News';
import Register from '../pages/Signup/Register';
import UserProfile from '../pages/UserInfo/UserProfile';
import Login from '../pages/About/Login/Login';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import CommentSection from '../pages/CommentSection/CommentSection';
import NotFount from '../components/NotFount/NotFount';
import Layout from '../layout/Layout';
import Home from '../pages/HomePage/Home';
import PhoneDetail from '../pages/PhonePage/PhoneDetail';
import GadgetDetail from '../pages/AllGatgets/GadgetsDetail';
import CartPage from '../pages/CartPage/CartPage';
import Phones from '../pages/PhonePage/Phones'
import Wishlist from '../pages/Wishlist/Wishlist';
import AllGadgets from '../pages/AllGatgets/AllGadgets';

const AppRoutes = ({changeLang}) => {
  return (
    <Routes>
      <Route path="/" element={<Layout  changeLang={changeLang} />}>
        <Route index element={<Home />} />
        <Route path="phones" element={<Phones />} />
        <Route path="phones/:id" element={<PhoneDetail />} />
        <Route path="gadgets" element={<AllGadgets />} />
        <Route path="gadgets/:id" element={<GadgetDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="comment" element={<CommentSection />} />
        <Route path="*" element={<NotFount />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
