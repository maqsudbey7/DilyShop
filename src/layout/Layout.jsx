import React from 'react'
import Navbar from '../pages/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer/Footer'

const Layout = ({changeLang}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar changeLang={changeLang}/>
      
      <main className="px-4 py-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
