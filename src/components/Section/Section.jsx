import React from "react";
import Card from "../Card/Card";
import { CaretRight } from "@phosphor-icons/react";
import "./Section.css";

export default function Section({ cls, heading, num, apiData, cls2 = null }) {
  return (
    <section className={`section ${cls} ${cls2}`}>
      <div className="header container">
        {/* Section title and a button to view more */}
        <h1 className="title">{heading}</h1>
        <button
          className="view-more"
          onClick={() => (window.location.href = `/category/${cls2}`)}
        >
          View All
          <CaretRight className="icon" size={18} />
        </button>
      </div>

      {/* Display a list of news cards */}
      <div className="card-section container">
        {apiData
          .slice(0, num) // Show only the first 'num' items
          .filter((val) => val.content) // Only show articles with content
          .map((data, i) => (
            <Card
              title={data.title}
              img={data.urlToImage}
              source={data.source.name}
              description={data.content}
              date={data.publishedAt}
              url={data.url}
              key={i}
            />
          ))}
      </div>
    </section>
  );
}
