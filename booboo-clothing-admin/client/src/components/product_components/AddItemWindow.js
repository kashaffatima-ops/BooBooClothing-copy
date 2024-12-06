import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../styles/ItemDetailWindow.css';

const AddItemWindow = ({ onClose, onAdd }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    current_price: '',
    original_price: '',
    image: '/placeholder.svg?height=350&width=300',
    sizes: { S: 0, M: 0, L: 0 }
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

  const handleSubmit = () => {
    onAdd(newItem);
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail-window">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="item-detail-content">
          <div className="item-detail-image-container">
            <img src={newItem.image} alt="Product preview" className="item-detail-image" />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newItem.image}
              onChange={handleInputChange}
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
                <label htmlFor="current_price">Current Price (PKR)</label>
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
                <label htmlFor="original_price">Original Price (PKR)</label>
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

              <div className="size-quantity-section">
                <div className="size-selector">
                  <label>Size</label>
                  <select 
                    value={currentSize} 
                    onChange={(e) => setCurrentSize(e.target.value)}
                    className="form-select"
                  >
                    {Object.keys(newItem.sizes).map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={newItem.sizes[currentSize]}
                    onChange={handleSizeQuantityChange}
                    className="form-input"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="item-detail-actions">
              <button className="update-button" onClick={handleSubmit}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemWindow;

