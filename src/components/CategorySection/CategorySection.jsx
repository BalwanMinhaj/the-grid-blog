/* this component is for the category sections in the home page */

import React, { useState, useEffect } from "react";
import { fetchCategoryNews } from "../../utils/api";
import { category } from "../Categories/Categories";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";

export default function CategorySection() {
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [loading, setLoading] = useState(true); // to set the loading state of the API, till the data is fetched

  /* to fetch data based on the category */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch news for all categories
        const categoryNewsPromises = category.map((cat) =>
          fetchCategoryNews(cat).then((data) => ({
            category: cat,
            articles: data.articles || [],
          }))
        );

        const results = await Promise.all(categoryNewsPromises);

        // Structure the results as { categoryName: articles }
        const categoryArticles = results.reduce(
          (acc, { category, articles }) => {
            acc[category] = articles;
            return acc;
          },
          {}
        );

        setArticlesByCategory(categoryArticles);
      } catch (err) {
        console.error("Error fetching category news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  /*  data is predefined so no need for complex code */
  return (
    <>
      {category.map((cat, id) => (
        <Section
          key={id}
          cls="category"
          cls2={cat.toLowerCase()}
          heading={cat}
          num={8}
          apiData={articlesByCategory[cat] || []}
        />
      ))}
    </>
  );
}
