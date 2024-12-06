import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Newcollections.css';
import Item from '../Item/Item';

const Popular = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/clothing')  // Replace with your backend URL
      .then((response) => {
        setClothingItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="popular">
      <h1>New Collection</h1>
      <hr />
      <div className="popular-item">
        {clothingItems.slice(0, 8).map((item) => (
          <Item
            key={item._id}  // Use _id to uniquely identify items
            id={item._id}
            name={item.Name}  // or any field you want as the name
            image={`http://localhost:5000/${item.imageName}`} // Use full URL from backend
            new_price={item.newPrice}
            old_price={item.oldPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
