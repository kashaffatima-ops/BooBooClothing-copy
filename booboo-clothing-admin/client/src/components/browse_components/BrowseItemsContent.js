import React, { useState } from 'react';
import ProductsGrid from './ProductsGrid';
import '../../styles/BrowseItems.css';

const BrowseItemsContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('mens');  // Set default to 'mens'

  return (
    <div className="browse-items-container">
      <div className="categories-sidebar">
        <button 
          className={`category-btn ${selectedCategory === 'mens' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('mens')}
        >
          Men
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'kids' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('kids')}
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
