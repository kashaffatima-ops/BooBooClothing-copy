import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../styles/ItemDetailWindow.css';

const ItemDetailWindow = ({ item, onClose, onDelete, onUpdate }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [currentSize, setCurrentSize] = useState('S');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'current_price' || name === 'original_price' ? parseFloat(value) : value
    }));
  };

  const handleSizeQuantityChange = (e) => {
    const { value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [currentSize]: parseInt(value) || 0
      }
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedItem);
  };

  return (
    <div className="item-detail-overlay">
      <div className="item-detail-window">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="item-detail-content">
          <div className="item-detail-image-container">
            <img src={editedItem.image} alt={editedItem.name} className="item-detail-image" />
          </div>
          
          <div className="item-detail-info">
            <h2 className="item-detail-title">{editedItem.name}</h2>
            
            <div className="item-detail-form">
              <div className="form-group">
                <label htmlFor="current_price">Current Price (PKR)</label>
                <input
                  type="number"
                  id="current_price"
                  name="current_price"
                  value={editedItem.current_price}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="original_price">Original Price (PKR)</label>
                <input
                  type="number"
                  id="original_price"
                  name="original_price"
                  value={editedItem.original_price}
                  onChange={handleInputChange}
                  className="form-input"
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
                    {Object.keys(editedItem.sizes).map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={editedItem.sizes[currentSize]}
                    onChange={handleSizeQuantityChange}
                    className="form-input"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="item-detail-actions">
              <button className="update-button" onClick={handleUpdate}>
                Update Item
              </button>
              <button className="delete-button" onClick={() => onDelete(item.id)}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailWindow;

