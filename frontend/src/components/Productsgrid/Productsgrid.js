import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Productsgrid.css";
import Item from "../Item/Item";

const ProductsGrid = (props) => {
  const [clothingItems, setClothingItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const category = props.category;

  // Fetch data from the backend API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/clothing") // Replace with your backend URL
      .then((response) => {
        // Filter items based on category
        const filteredItems = response.data.data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setClothingItems(filteredItems); // Set the filtered items based on the category
        setFilteredItems(filteredItems); // Initially, filteredItems matches clothingItems
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [category]); // Re-fetch when category changes

  // Handle search query updates
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const updatedFilteredItems = clothingItems.filter((item) =>
      item.Name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredItems(updatedFilteredItems);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchQuery, clothingItems]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-grid">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Collection</h1>
      <hr />
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
        />
      </div>
      <hr />
      {/* Products Grid */}
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
      {/* Pagination */}
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
