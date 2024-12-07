import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Item from './Item';
import ItemDetailWindow from './ItemDetailWindow';
import AddItemWindow from './AddItemWindow';
import '../../styles/ProductList.css';

const ProductList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clothing');
        console.log('Full Response:', response);
        console.log('Response Data:', response.data);
      
        // Prepend the base URL to imageName
        const fetchedItems = response.data.data.map(item => ({
          ...item,
          image: `http://localhost:5000/${item.imageName}`
        }));
        setItems(fetchedItems); 
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      }
    };
  
    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailWindow = () => {
    setSelectedItem(null);
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clothing/${id}`);
      setItems(items.filter(item => item._id !== id)); 
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/clothing/${updatedItem._id}`, updatedItem);
      setItems(items.map(item => item._id === updatedItem._id ? response.data : item));
      setSelectedItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5000/api/clothing', newItem);
      setItems(prev => [...prev, response.data]);
      setShowAddItem(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <button className="add-item-button" onClick={() => setShowAddItem(true)}>
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Conditionally render AddItemWindow when showAddItem is true */}
      {showAddItem && (
        <AddItemWindow 
          onAddItem={handleAddItem} 
          onClose={() => setShowAddItem(false)} 
        />
      )}
      
      <div className="item-grid">
        {items.length > 0 ? (
          items.map(item => (
            <Item 
              key={item._id}
              {...item} 
              onClick={() => handleItemClick(item)}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
