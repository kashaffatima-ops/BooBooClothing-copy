import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";

const Product = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // State to store the selected size
  const [userId, setUserId] = useState(null); // Store user ID

  // Fetch the product details based on the productId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/clothing/${productId}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    // Fetch user ID from the token when adding to cart
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`http://localhost:5000/api/auth/findByToken`, { token })
        .then((response) => {
          setUserId(response.data.userId); // Set the user ID from the response

          if (!selectedSize) {
            alert("Please select a size!");
            return;
          }

          if (product.sizes[selectedSize] <= 0) {
            alert("Selected size is out of stock!");
            return;
          }

          const itemToAdd = { itemId: productId, quantity: 1 }; // Add 1 item by default
          axios
            .post(`http://localhost:5000/api/cart/add`, { ...itemToAdd, userId: response.data.userId })
            .then((response) => {
              alert("Item added to cart successfully!");
            })
            .catch((error) => {
              console.error("Error adding item to cart:", error);
              alert("Failed to add item to cart.");
            });
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    } else {
      alert("User not found. Please log in.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  // Ensure product.sizes is an object before calling Object.entries
  const availableSizes = product.sizes
    ? Object.entries(product.sizes).filter(
        ([size, quantity]) => quantity > 0 // Only include sizes with positive quantity
      )
    : []; // Fallback to an empty array if product.sizes is undefined or null

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={`http://localhost:5000/${product.imageName}`} alt={product.Name} />
      </div>
      <div className="product-info">
        <h1>{product.Name}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> PKR {product.newPrice}
        </p>
        {product.oldPrice && (
          <p>
            <strong>Old Price:</strong> <del>{product.oldPrice}</del>
          </p>
        )}
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <div className="size-selection">
          <strong>Select Size:</strong>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            disabled={availableSizes.length === 0}
          >
            <option value="">Select Size</option>
            {availableSizes.map(([size, quantity]) => (
              <option key={size} value={size}>
                {size} (In Stock: {quantity})
              </option>
            ))}
          </select>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className="product-info-footer">
          <p>Free shipping. Free return</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
