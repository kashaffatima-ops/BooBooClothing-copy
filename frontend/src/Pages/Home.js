import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import Newcollections from '../components/NewCollections/Newcollections'
import Newsletter from '../components/Newletter/Newsletter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Popular />
      <Offers/>
      <Newcollections/>
      <Newsletter/>
    </div>
  )
}

export default Home
