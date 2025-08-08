import React from 'react'
import partner1 from '../../../public/Shop card.png'
import partner2 from '../../../public/Shop card (1).png'
import partner3 from '../../../public/Frame 160.png'
import partner4 from '../../../public/Frame 161.png'
import partner5 from '../../../public/Frame 162.png'
import partner6 from '../../../public/Frame 163.png'
import { useTranslation } from 'react-i18next'



const PartnerCamp = () => {
  let { t } = useTranslation()
  return (
    <div className='flex flex-col gap-4 mt-16'>
      <div className='flex justify-between'>
        <p className='text-2xl ml-6 font-semibold'>{t('PopularBrands')}</p>
      </div>
      <div className='grid grid-cols-6 gap-6  max-lg:grid-cols-3 max-sm:grid-cols-2 max-[]:'>
        <img className='object-contain w-full h-full' src={partner1} alt="" />
        <img className='object-contain w-full h-full' src={partner2} alt="" />
        <img className='object-contain w-full h-full' src={partner3} alt="" />
        <img className='object-contain w-full h-full' src={partner4} alt="" />
        <img className='object-contain w-full h-full' src={partner5} alt="" />
        <img className='object-contain w-full h-full' src={partner6} alt="" />

      </div>
    </div>
  )
}

export default PartnerCamp