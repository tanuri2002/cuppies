import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // make sure this is imported

function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Cuppies</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
