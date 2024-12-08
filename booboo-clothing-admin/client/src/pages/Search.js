import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/search_components/SearchBar';
import ProductsGrid from '../components/browse_components/ProductsGrid';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State to store the search query

  return (
    <div>
      <Navbar />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pass query and setter */}
      <ProductsGrid searchQuery={searchQuery} />  {/* Pass search query to filter products */}
    </div>
  );
};

export default Search;
