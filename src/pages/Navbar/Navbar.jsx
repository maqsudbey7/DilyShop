import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaBars } from "react-icons/fa6";
import { FaRegUserCircle, FaTimesCircle } from 'react-icons/fa';
import logo from '../../../public/Logo (2).png';
import { Link, NavLink } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { clearCart, clearWishlist } from '../../store/cartSlice';

const Navbar = ({ changeLang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const cart = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.cart.wishlist);
    const dropdownRef = useRef(null);
    let user = null;
    const dispatch = useDispatch();

    let { t } = useTranslation()
    let handleLanguageChange = (e) => {
        changeLang(e.target.value)
        console.log(e.target.value)
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');

        dispatch(clearCart());         // savatchani tozalash
        dispatch(clearWishlist());     // sevimlilarni tozalash

        toast.success("Muvaffaqiyatli chiqildi");
        navigate('/');
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    try {
        const userData = localStorage.getItem("loggedUser");
        if (userData) user = JSON.parse(userData);
    } catch (err) {
        console.warn("User data not parsable:", err);
    }

    const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
    const avatar = user?.image;

    return (
        <header className="w-full font-[Poppins] text-sm bg-white z-50 relative shadow-md">
            <div className="py-4 px-4 max-w-[1300px] mx-auto flex items-center justify-between">
                {/* Logo & Desktop Menu */}
                <div className="flex items-center gap-6">
                    <img src={logo} alt="Logo" className="h-10 w-auto max-[500px]:h-6" />
                    <div className="hidden lg:flex gap-6 text-gray-700 font-medium">
                        <NavLink to="/" className="hover:text-green-600 transition">{t("Home")}</NavLink>
                        <NavLink to="/gadgets" className="hover:text-green-600 transition">{t('AllGadgets')}</NavLink>
                        <NavLink to="/phones" className="hover:text-green-600 transition">{t("Phones")}</NavLink>
                        <NavLink to="/about" className="hover:text-green-600 transition">{t('AboutUs')}</NavLink>
                        <NavLink to="/news" className="hover:text-green-600 transition">{t('News')}</NavLink>
                        <NavLink to="/contact" className="hover:text-green-600 transition">{t('Contact')}</NavLink>
                        <NavLink to="/comment" className="hover:text-green-600 transition">{t('Comment')}</NavLink>
                    </div>
                </div>

                {/* Icons & Mobile Menu Toggle */}
                <div className="flex items-center gap-6 max-[500px]:gap-3 text-gray-700 relative">
                    {/* Cart */}
                    <NavLink to="/cart" className="relative">
                        <BsCart3 className="text-xl hover:text-green-600 transition" />
                        {cart.filter(Boolean).length > 0 && (
                            <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.filter(Boolean).length}
                            </span>
                        )}
                    </NavLink>


                    {/* Wishlist */}
                    <NavLink to="/wishlist" className="relative">
                        <FaHeart className="text-xl hover:text-green-600 transition" />
                        {wishlistItems && wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 text-xs bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </NavLink>

                    <select onChange={handleLanguageChange}
                        className="border text-sm px-2 py-1 max-[500px]:px-1 max-[500px]:text-sm rounded-md focus:outline-none focus:ring focus:border-green-500">
                        <option value="en">English</option>
                        <option value="uz">O'zbekcha</option>
                    </select>


                    {/* User Avatar */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="w-9 h-9 rounded-full overflow-hidden cursor-pointer border border-green-600"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {avatar ? (
                                    <img src={avatar} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-green-700 bg-gray-100 font-semibold">
                                        {user.firstName?.[0]}{user.lastName?.[0]}
                                    </div>
                                )}
                            </div>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-100">
                                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profil</Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        {t("Close")}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/register" className="hover:text-green-600">{t("Login")}</Link>
                    )}

                    {/* Mobile Menu Icon */}
                    <div className="lg:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimesCircle /> : <FaBars />}
                    </div>
                </div>
            </div>

            {/* Mobile Full Screen Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white/50 min-h-screen opacity-45 text-xl max-[500px]:text-sm text-center px-6 py-6 space-y-6 border-t shadow-md nav-slide">
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t("Home")}</NavLink>
                    <NavLink to="/gadgets" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t('AllGadgets')}</NavLink>
                    <NavLink to="/phones" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t('Phones')}</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t('AboutUs')}</NavLink>
                    <NavLink to="/news" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t("News")}</NavLink>
                    <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t("Contact")}</NavLink>
                    <NavLink to="/comment" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t('Comment')}</NavLink>
                    <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t("Cart")} ({cart.length})</NavLink>
                    <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-600">{t("Favorites")} ({wishlistItems.length})</NavLink>
                </div>
            )}


        </header>

    );
};

export default Navbar;
