import React from 'react';
import '../../styles/Item.css';

const Item = ({ id, Name, current_price, original_price, image, sizes }) => {
  const showOldPrice = current_price < original_price;

  return (
    <div className='item'>
      <img className="item-image" src={image} alt={Name} /> 
      <div className="item-info">
        <h3 className="item-name">{Name}</h3>
        <div className="item-prices">
          <div className="item-price-new">
            PKR {current_price}
          </div>
          {showOldPrice && (
            <div className="item-price-old">
              PKR {original_price}
            </div>
          )}
        </div>
        <div className="item-sizes">
          {Object.entries(sizes).map(([size, quantity]) => (
            <div key={size} className="size-info">
              <span className="size-label">{size}:</span>
              <span className="size-quantity">{quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Item;
