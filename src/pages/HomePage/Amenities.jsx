import React from 'react'
import img1 from '../../../public/Frame 29.png'
import img2 from '../../../public/Group 408.png'
import img3 from '../../../public/Group 395.png'
import img4 from '../../../public/Group 404.png'
import img5 from '../../../public/Group 405.png'
import img6 from '../../../public/Group 407.png'
import { useTranslation } from 'react-i18next'



const Amenities = () => {
  let { t } = useTranslation()
  let amenitie = [
    {
      name: t("ConvenientDelivery"),
      img: img1,
    },
    {
      name: t("PaymentByAnyMethod"),
      img: img2,
    },
    {
      name: t("WarrantyService"),
      img: img3,
    },
    {
      name: t("FastExchangeAndReturn"),
      img: img4,
    },
    {
      name: t("ExpressDelivery"),
      img: img5,
    },
    {
      name: t("BestPrices"),
      img: img6,
    },
  ]
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-12'>
      {
        amenitie.map((item, i) => (
          <div
            key={i}
            className='flex flex-col justify-between items-center gap-2 rounded-xl shadow-lg p-4 text-center bg-white'
          >
            <p className='text-[14px] sm:text-[16px] font-semibold break-words'>
              {item.name}
            </p>

            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center '>
              <img src={item.img} alt="" className='w-14 h-14 object-contain' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Amenities
