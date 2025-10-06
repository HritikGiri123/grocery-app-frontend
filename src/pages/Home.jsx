import React from 'react'
import MainBanners from '../components/MainBanners'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'




const Home = () => {
  return (
    <div className='mt-10'>

    <MainBanners/>
   
    <Categories/>
    <BestSeller/>
    <BottomBanner/>
    <NewsLetter/>

    </div>
  )
}

export default Home
