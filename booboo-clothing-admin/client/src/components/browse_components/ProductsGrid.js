import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../product_components/Item';
import '../../styles/ProductsGrid.css';

const ProductsGrid = ({ category, searchQuery }) => {
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setLoading(true);

    // Fetch clothing items only once when component mounts
    const fetchClothingItems = async () => {
      try {
        const url = 'http://localhost:5000/api/clothing';
        const response = await axios.get(url);

        setClothingItems(response.data.data);
        setFilteredItems(response.data.data);  // Initially show all items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  // Filter items dynamically whenever searchQuery, category, or clothingItems change
  useEffect(() => {
    let filtered = clothingItems;

    if (category) {
      filtered = filtered.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, category, clothingItems]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

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
              Name={item.Name}
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

      {/* Pagination */}
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
