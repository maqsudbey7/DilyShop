import React from 'react'
import BannerSlider from '../HomePage/BannerSlider'
import BestSellers from '../HomePage/BestSellers'
import News from '../HomePage/News'
import Discounts from '../HomePage/Discounts'
import NewsGatjetHome from '../HomePage/NewsGatjetHome'
import PartnerCamp from '../HomePage/PartnerCamp'
import Amenities from '../HomePage/Amenities'

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <BestSellers />
      <News />
      <Discounts />
      <NewsGatjetHome />
      <PartnerCamp />
      <Amenities/>
    </div>
  )
}

export default Home