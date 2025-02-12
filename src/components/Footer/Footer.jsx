import React from "react";

export default function Footer() {
  const date = new Date();
  return (
    <footer>
      {/* to get the current year, date.getFullYear() is used */}
      <p className="container">
        &#169; All Rights Reserved {date.getFullYear()}
      </p>
    </footer>
  );
}
