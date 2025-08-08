import React from 'react'
import polygon1 from '../../../public/Polygon 8.png'
import polygon2 from '../../../public/Polygon 9.png'
import polygon3 from '../../../public/Polygon 10.png'
import truck from '../../../public/Group 391.png'
import { useTranslation } from 'react-i18next'

const Discounts = () => {
    let { t } = useTranslation()

    return (
        <div className='flex flex-wrap justify-between gap-6 mt-12'>
            {/* Cashback Card */}
            <div className='relative flex-1 min-w-[300px] h-[220px] bg-[#00C65E] rounded-xl overflow-hidden p-6 transition-transform hover:scale-105 duration-300 shadow-lg'>

                {/* Text */}
                <div className='text-white text-2xl font-semibold z-10 relative'>
                    <p> {t("Cashbackforany")}<br /> {t("Purchase")}!</p>
                </div>

                {/* Polygon 1 - 5% */}
                <div className='absolute top-6 right-6 animate-bounce'>
                    <img src={polygon1} alt="5%" className='w-[130px] md:w-[160px]' />
                    <p className='absolute inset-0 flex items-center justify-center text-[#F89358] font-bold text-4xl md:text-5xl'>
                        5%
                    </p>
                </div>

                {/* Polygon 2 - 15% */}
                <div className='absolute top-2 left-[60%] animate-pulse'>
                    <img src={polygon2} alt="15%" className='w-[80px] md:w-[96px]' />
                    <p className='absolute inset-0 flex items-center justify-center text-[#FFB762] font-bold text-xl md:text-2xl'>
                        15%
                    </p>
                </div>

                {/* Polygon 3 - 15% */}
                <div className='absolute bottom-0 right-[45%] animate-bounce delay-150'>
                    <img src={polygon3} alt="15%" className='w-[100px] md:w-[130px]' />
                    <p className='absolute inset-0 flex items-center justify-center text-white font-bold text-3xl md:text-4xl'>
                        15%
                    </p>
                </div>
            </div>

            {/* Delivery Card */}
            <div className='relative flex-1 min-w-[300px] h-[220px] bg-[#FFB762] rounded-xl flex items-center justify-between px-6 transition-transform hover:scale-105 duration-300 shadow-lg'>

                {/* Text */}
                <div className='text-white text-2xl md:text-3xl font-semibold'>
                    {t("ExpressDelivery")} <br />
                    <span className='text-[#00C65E] text-3xl md:text-4xl font-bold'>{t("In2hours")}</span>
                </div>

                {/* Truck Image */}
                <div className='w-[120px] md:w-[150px]'>
                    <img src={truck} alt="truck" className='w-full h-auto animate-slide-in-right' />
                </div>
            </div>
        </div>
    )
}

export default Discounts
