import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!storedUser) {
      toast.error("Foydalanuvchi topilmadi. Iltimos, ro'yxatdan o'ting.");
      return;
    }

    if (phone === storedUser.phone && password === storedUser.password) {
      localStorage.setItem("user", JSON.stringify(storedUser));
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Muvaffaqiyatli tizimga kirdingiz!");
      navigate("/profile");
    } else {
      toast.error("Noto‘g‘ri telefon raqam yoki parol");
    }
  };

  return (
    <form 
      onSubmit={handleLogin} 
      className="p-6 space-y-4 max-w-md mx-auto mt-10 border rounded shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="text"
        placeholder="Telefon raqami"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800"
      />

      <input
        type="password"
        placeholder="Parol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800"
      />

      <button 
        type="submit" 
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
      >
        Kirish
      </button>
    </form>
  );
};

export default Login;
