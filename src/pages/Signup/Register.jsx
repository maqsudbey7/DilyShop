import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
    let { t } = useTranslation()
  

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    password: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData(prev => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, phone, password } = formData;

    if (!firstName || !phone || !password) {
      toast.error(t("Pleasefillinallfields"));
      return;
    }

    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;
    if (!validPassword.test(password)) {
      toast.error(t("Passwordmustcontainlettersnumbersandspecialcharacters"));
      return;
    }

    const user = {
      id: Date.now(),
      firstName,
      phone,
      password,
      image: "https://i.pravatar.cc/150?img=12"
    };

    try {
      const payload = {
        firstName,
        phone,
        password,
        image: "https://i.pravatar.cc/150?img=12" // dummy avatar
      };

      const response = await axios.post(
        'https://dummyjson.com/users/add',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('loggedUser', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.id || 'dummy-token');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userPassword', password);

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(user);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success(t("Registrationsuccessful"), { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      toast.error(t("Anerroroccurredduringregistration"));
    }
  };

  return (
    <div className=" py-8 flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to DILY 🚀</h2>
          <p className="text-lg mb-6">Create an account and explore the world of free ads!</p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>📦 Post and manage your ads easily</li>
            <li>🔒 100% Secure and private</li>
            <li>🌍 Multilingual & responsive design</li>
            <li>🧰 Built for UX and speed</li>
          </ul>
        </div>

        {/* FORM SIDE */}
        <div className="p-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Create Account</h3>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First Name */}
            <div>
              <label className="block text-sm mb-1">{t("Name")}</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1">{t("PhoneNumber")}</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">{t("Password")}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm mb-1">{t("Avatar")} ({t("Optional")})</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-600 dark:text-gray-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {t("Register")}
            </button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
             {t("Alreadyhaveanaccount")}{" "}
              <Link to="/login" className="text-green-600 hover:underline dark:text-green-400">
                {t("Loginhere")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
