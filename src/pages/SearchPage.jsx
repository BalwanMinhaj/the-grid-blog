import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../utils/api";
import Section from "../components/Section/Section";
import "../components/Section/Section.css";
import Loader from "../components/Loader/Loader";

export default function SearchPage() {
  // State for storing search results
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1); // Keeps track of pagination
  const [hasMore, setHasMore] = useState(true); // Checks if more results are available
  const [loading, setLoading] = useState(true); // Shows loading state

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); // Get search query from URL

  // Reset search results when the query changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Fetch search results whenever the query or page number changes
  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const results = await fetchSearchResults(query, page);
          if (results.length === 0) {
            setHasMore(false); // No more results to load
          } else {
            setArticles((prevArticles) => [...prevArticles, ...results]);
          }
        } catch (err) {
          return err;
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query, page]);

  // Load more results when the button is clicked
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Show loader while fetching results
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Section
        cls="search"
        heading={`Results for ${query}`}
        num={20}
        apiData={articles}
      />

      {/* Show "Load More" button if there are more results */}
      {hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {/* Message when there are no more results */}
      {!hasMore && articles.length > 0 && (
        <p
          className="container"
          style={{ fontSize: "1.125rem", textAlign: "center" }}
        >
          No more results to load.
        </p>
      )}

      {/* Message when no results are found */}
      {!hasMore && articles.length === 0 && (
        <p
          className="container"
          style={{ fontSize: "1.125rem", textAlign: "center" }}
        >
          No results found.
        </p>
      )}
    </>
  );
}
