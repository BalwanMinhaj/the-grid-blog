import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import Categories from "../Categories/Categories";
import Search from "../Search/Search";
import { InstagramLogo, List, MetaLogo, X, XLogo } from "@phosphor-icons/react";

/**
 * Navbar Component - Renders the main navigation bar with logo, search bar, and menu options.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <nav className="navbar container">
        <Link to="/" className="logo" tabIndex={isMenuOpen ? -1 : 0}>
          <img src={Logo} alt="the grid blog logo" title="the grid blog" />
          <h3>the grid blog.</h3>
        </Link>
        <Search cls="nav-input" tabIndex={isMenuOpen ? -1 : 0} />
        <button className="menu-btn" onClick={toggleMenu} tabIndex={0}>
          MENU
          <List size={20} weight="bold" />
        </button>
      </nav>

      <Categories className="nav-category" />

      <menu className={`menu-container ${isMenuOpen ? "active" : ""}`}>
        <div className="heading">
          <h3>MENU</h3>
          <button className="close-btn" onClick={toggleMenu}>
            <X size={20} weight="bold" />
          </button>
        </div>
        <Search />
        <Categories className="menu-category" />

        {/* Social Media Links */}
        <div className="bottom">
          <h4>Follow us on</h4>
          <div className="socials">
            <a href="#" className="icon">
              <InstagramLogo size={20} weight="bold" />
            </a>
            <a href="#" className="icon">
              <XLogo size={20} weight="bold" />
            </a>
            <a href="#" className="icon">
              <MetaLogo size={20} weight="bold" />
            </a>
          </div>
        </div>
      </menu>
    </header>
  );
}
