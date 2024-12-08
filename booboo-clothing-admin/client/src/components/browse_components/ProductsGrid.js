import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../product_components/Item';
import '../../styles/ProductsGrid.css';

const ProductsGrid = ({ category }) => {
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/clothing') 
      .then((response) => {
        const filteredItems = response.data.data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setClothingItems(filteredItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [category]);
  

  const totalPages = Math.ceil(clothingItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = clothingItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products-grid">
      <div className="grid-container">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              name={item.Name}
              current_price={item.newPrice}
              original_price={item.oldPrice}
              image={`http://localhost:5000/${item.imageName}`} 
              sizes={item.sizes}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>

      {/* PAGINATION LOGIC */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
