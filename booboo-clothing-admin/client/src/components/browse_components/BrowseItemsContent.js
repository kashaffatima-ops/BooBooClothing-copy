import React, { useState } from 'react';
import ProductsGrid from './ProductsGrid';
import '../../styles/BrowseItems.css';

const BrowseItemsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('Men');

  return (
    <div className="browse-items-container">
      <div className="categories-sidebar">
        <button 
          className={`category-btn ${selectedCategory === 'Men' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Men')}
        >
          Men
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'Kids' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Kids')}
        >
          Kids
        </button>
      </div>
      <div className="products-grid-container">
        <ProductsGrid category={selectedCategory} />
      </div>
    </div>
  );
};

export default BrowseItemsContent;

