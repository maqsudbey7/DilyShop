// components/SearchInput.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Search = ({ searchTerm, setSearchTerm }) => {
  let { t } = useTranslation()

    let handleNull = () => {
        setSearchTerm('')
        
    }
    return (
        <div className="relative w-[280px] max-w-md  my-6">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder={t("ProductName")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 text-sm shadow focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className='absolute top-2 text-xl right-3' onClick={handleNull}><IoClose /></button>
        </div>
    );
};

export default Search;
