import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import '../../styles/ItemDetailWindow.css';

const AddItemWindow = ({ onClose, onAdd }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    current_price: '',
    original_price: '',
    image: '',
    sizes: { S: 0, M: 0, L: 0 },
    category: 'shirts',
    description: '',
  });
  const [currentSize, setCurrentSize] = useState('S');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'current_price' || name === 'original_price' ? parseFloat(value) : value
    }));
  };

  const handleSizeQuantityChange = (e) => {
    const { value } = e.target;
    setNewItem(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [currentSize]: parseInt(value) || 0
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewItem(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('sizes', JSON.stringify(newItem.sizes));
    formData.append('Name', newItem.name);  
    formData.append('category', newItem.category);
    formData.append('newPrice', newItem.current_price); 
    formData.append('oldPrice', newItem.original_price); 
    formData.append('description', newItem.description);
    formData.append('image', newItem.image);

   
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/clothing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      onAdd(response.data); 
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail-window">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="item-detail-content">
          <div className="item-detail-image-container">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="form-input mt-4"
            />
          </div>
          
          <div className="item-detail-info">
            <h2 className="item-detail-title">Add New Item</h2>
            
            <div className="item-detail-form">
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="current_price">Current Price</label>
                <input
                  type="number"
                  id="current_price"
                  name="current_price"
                  value={newItem.current_price}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="original_price">Original Price</label>
                <input
                  type="number"
                  id="original_price"
                  name="original_price"
                  value={newItem.original_price}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="size-S">Size S Quantity</label>
                <input
                  type="number"
                  id="size-S"
                  value={newItem.sizes.S}
                  onChange={handleSizeQuantityChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="size-M">Size M Quantity</label>
                <input
                  type="number"
                  id="size-M"
                  value={newItem.sizes.M}
                  onChange={handleSizeQuantityChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="size-L">Size L Quantity</label>
                <input
                  type="number"
                  id="size-L"
                  value={newItem.sizes.L}
                  onChange={handleSizeQuantityChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="shirts">Shirts</option>
                  <option value="trousers">Trousers</option>
                  <option value="hoodies">Hoodies</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <button onClick={handleSubmit} className="submit-button">Add Item</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemWindow;
