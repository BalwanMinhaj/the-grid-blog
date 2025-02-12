import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/SearchPage";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar/Navbar";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <>
      <Navbar />

      {/* This is for routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/* This /:category is for dyanmic routing for category page */}
        <Route path="/category/:category" element={<CategoryPage />} />
        {/* This route is for the 404 page, if there is not a page it will redirect to this page  */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/* This SVG is for the grainy effect and should not be removed */}
      {/* Code copied from https://codepen.io/Juxtopposed/pen/BaqLEQY?editors=1100 */}
      <svg className="svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </>
  );
}
