import React from "react";
import { Link } from "react-router-dom";

// these are all the categories available in the API
export const category = [
  "Technology",
  "Sports",
  "Entertainment",
  "Science",
  "Business",
  "Health",
];

// this function is for the navigation for the category page
export default function Categories({ ...props }) {
  return (
    <ul {...props}>
      {category.map((ctgy, i) => (
        <li key={i}>
          <Link to={`/category/${ctgy.toLowerCase()}`} title={ctgy}>
            {ctgy}
          </Link>
        </li>
      ))}
    </ul>
  );
}
