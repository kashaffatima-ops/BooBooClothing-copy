import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Productsgrid.css";
import Item from "../Item/Item";

const ProductsGrid = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clothing") // Replace with your backend URL
      .then((response) => {
        setClothingItems(response.data.data); // Assuming the backend returns an array in `data`
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(clothingItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = clothingItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-grid">
      <h1>Mens</h1>
      <hr />
      <div className="grid-container">
        {currentItems.map((item) => (
          <Item
            key={item._id} // Use _id from the database
            id={item._id}
            name={item.Name} // Use the correct field for name
            image={`http://localhost:5000/${item.imageName}`} // Use the full image path
            new_price={item.newPrice}
            old_price={item.oldPrice}
          />
        ))}
      </div>
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
    </div>
  );
};

export default ProductsGrid;
