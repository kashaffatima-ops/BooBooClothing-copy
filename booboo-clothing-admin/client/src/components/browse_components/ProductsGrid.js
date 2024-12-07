import React, { useState, useEffect } from 'react';
import Item from '../product_components/Item';
import { products } from '../../data/products';
import '../../styles/ProductsGrid.css';

const ProductsGrid = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const itemsPerPage = 12;

  useEffect(() => {
    const filtered = products.filter(product => 
      (!category || product.category === category)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [category]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="products-grid">
      <h1>{category}</h1>
      <hr />
      <div className="grid-container">
        {currentItems.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            current_price={item.current_price}
            original_price={item.original_price}
            image={item.image}
            sizes={item.sizes}
          />
        ))}
      </div>
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
              className={currentPage === i + 1 ? "active" : ""}
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

