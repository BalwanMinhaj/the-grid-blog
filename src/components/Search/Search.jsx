import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Search.css";

/**
 * Search Component - Handles user input for searching content.
 * Updates the query state based on URL parameters and user input.
 */
export default function Search({ cls, onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract search query from URL parameters and update state
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
  }, [location.search]);

  // Handles input field changes
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Executes search when the button is clicked or Enter is pressed
  const handleSearch = () => {
    if (query.trim()) {
      console.log("Search query:", query);
      if (onSearch) {
        onSearch(query);
      }
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Listens for Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`search-container ${cls}`}>
      <input
        type="search"
        placeholder="Search...."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <MagnifyingGlass className="icon" weight="regular" size={20} />
      </button>
    </div>
  );
}
