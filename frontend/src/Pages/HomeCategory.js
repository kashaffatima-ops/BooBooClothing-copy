import React from 'react'
import ProductsGrid from '../components/Productsgrid/Productsgrid'
const HomeCategory = (props) => {
  return (
    <div>
            <ProductsGrid category={props.category}/>

    </div>
  )
}

export default HomeCategory
