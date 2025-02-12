/* This component is used for the article cards in the website
As all the cards share the same data. */

import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

// image taken from https://commons.wikimedia.org/wiki/File:No-image-available-4X3.png
import brokenImg from "../../assets/img/broken.png";
import "./Card.css";

export default function Card({ title, img, source, description, date, url }) {
  /* This function is to format the data from the API data.
    Date from the API is in this "2025-01-16T11:00:00Z" format,
    and will be converted to "Feb 8, 2025" format. */
  function formattedDate(date) {
    const formattedDate = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return formattedDate.toLocaleDateString("en-US", options);
  }

  /* handleShare function is for sharing the news with other people.
  and if its not supported then it will show an alert. */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Web Share not supported on this browser.");
    }
  };

  return (
    <article className="card">
      <div className="image">
        {/* If the image is broken then it will be show the substitute/broken image */}
        <img
          src={img || brokenImg}
          alt={title}
          onError={(event) => {
            event.target.src = brokenImg;
          }}
        />
      </div>
      <div className="card-body">
        <div className="meta">
          <p className="date">{formattedDate(date)}</p>
          <p className="source">{source}</p>
        </div>
        <a target="_blank" href={url} title={title}>
          <h2>{title}</h2>
        </a>
        <p className="description">{description}</p>
        <button title="Share button" className="share" onClick={handleShare}>
          Share the article <ArrowUpRight weight="regular" size={20} />
        </button>
      </div>
    </article>
  );
}
