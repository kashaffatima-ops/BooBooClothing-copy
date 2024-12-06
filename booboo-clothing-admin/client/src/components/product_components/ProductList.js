import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Item from './Item';
import ItemDetailWindow from './ItemDetailWindow';
import AddItemWindow from './AddItemWindow';
import '../../styles/ProductList.css';

const ProductList = () => {
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'T-Shirt', 
      current_price: 1500, 
      original_price: 2000, 
      image: '/tshirt.png', 
      sizes: { S: 10, M: 15, L: 20 } 
    },
    { 
      id: 2, 
      name: 'Jeans', 
      current_price: 3000, 
      original_price: 3500, 
      image: '/jeans.jpg', 
      sizes: { S: 5, M: 10, L: 15 } 
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailWindow = () => {
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    setSelectedItem(null);
  };

  const handleAddItem = (newItem) => {
    setItems(prev => [...prev, {
      ...newItem,
      id: prev.length + 1,
    }]);
    setShowAddItem(false);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <button className="add-item-button" onClick={() => setShowAddItem(true)}>
          <Plus size={20} />
          Add Item
        </button>
      </div>
      
      <div className="item-grid">
        {items.map(item => (
          <Item 
            key={item.id} 
            {...item} 
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {selectedItem && (
        <ItemDetailWindow 
          item={selectedItem}
          onClose={handleCloseDetailWindow}
          onDelete={handleDeleteItem}
          onUpdate={handleUpdateItem}
        />
      )}

      {showAddItem && (
        <AddItemWindow 
          onClose={() => setShowAddItem(false)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
};

export default ProductList;

