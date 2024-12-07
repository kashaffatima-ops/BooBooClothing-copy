import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';


const Item = (props) => {
  console.log('Image URL:', props.image);  // Log the image URL
  const id = props.id;
  return (
    <div className='item'>
       <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'inherit' }}>
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
      </Link>
    </div>
  );
}

export default Item;
