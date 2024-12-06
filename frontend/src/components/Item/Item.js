import React from 'react';
import './Item.css';

const Item = (props) => {
  console.log('Image URL:', props.image);  // Log the image URL

  return (
    <div className='item'>
<img
        className="item-image"
        src={props.image} // This will now be the full URL from backend
        alt={props.name}
      />      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          PKR {props.new_price}
        </div>
        <div className="item-price-old">
          PKR {props.old_price}
        </div>
      </div>
    </div>
  );
}

export default Item;
