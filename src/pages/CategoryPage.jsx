import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { fetchCategoryNews } from "../utils/api";
import Section from "../components/Section/Section";
import "../components/Section/Section.css";
import Loader from "../components/Loader/Loader";
import { category as validCategories } from "../components/Categories/Categories";

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Set initial loading to false
  const [isValidCategory, setIsValidCategory] = useState(true);

  // Check if the category is valid whenever it changes
  useEffect(() => {
    const checkCategoryValidity = () => {
      const isValid = validCategories
        .map((c) => c.toLowerCase())
        .includes(category.toLowerCase());
      setIsValidCategory(isValid);
    };

    checkCategoryValidity();
    if (isValidCategory) {
      setArticles([]); // Reset articles only if valid category
      setPage(1); // Reset page to 1
      setHasMore(true); // Reset hasMore to true
      setLoading(false); // Reset loading state when category changes
    }
  }, [category, isValidCategory]);

  // Fetch data when page or category changes
  useEffect(() => {
    if (!isValidCategory || !category) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCategoryNews(category, page);
        setArticles((prevArticles) => {
          // Avoid duplicate entries
          const newArticles = data.articles.filter(
            (newArticle) =>
              !prevArticles.some((article) => article.url === newArticle.url)
          );
          return [...prevArticles, ...newArticles];
        });
        setHasMore(data.articles.length === 10); // If fewer than 10 articles, set hasMore to false
      } catch (error) {
        console.error("Error fetching category news:", error);
        setHasMore(false); // Set hasMore to false if there's an error
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };

    fetchData();
  }, [page, category, isValidCategory]); // Re-fetch when page or category changes

  // Load more articles
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Redirect to a 404 page if the category is invalid
  if (!isValidCategory) {
    return <Navigate to="/404" replace />;
  }

  // Show loader when fetching data for the first page
  if (loading && page === 1) {
    return <Loader />;
  }

  return (
    <>
      <Section
        cls="category-page"
        heading={category.charAt(0).toUpperCase() + category.slice(1)}
        num={20}
        apiData={articles}
      />
      {loading && page > 1 && <Loader />} {/* Show loader after first page */}
      {!loading && hasMore && (
        <button className="load-more" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {!hasMore && articles.length > 0 && (
        <p
          className="container"
          style={{ fontSize: "1.125rem", textAlign: "center" }}
        >
          No more results to load.
        </p>
      )}
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
