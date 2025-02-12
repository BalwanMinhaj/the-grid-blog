/* this component is for the Latest News */

import React, { useState, useEffect } from "react";
import Section from "../Section/Section";
import { fetchTH } from "../../utils/api";
import Loader from "../Loader/Loader";
import "./Hero.css";

export default function Hero() {
  const [val, setVal] = useState([]);
  const [error, setError] = useState(null); // for errors
  const [loading, setLoading] = useState(true); // setting loading state

  // using the fetchTH function from the utils.js file to get the Top Headlines.
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const thData = await fetchTH();
        setVal(thData.articles || []);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    // Initial fetch
    fetchData();

    // Set interval for every 30 minutes (30 * 60 * 1000 ms) to get new data every 30 mins
    const intervalId = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>; // Add error message
  }

  // See Section.jsx file
  return <Section cls="hero" heading="Latest News" num={6} apiData={val} />;
}
