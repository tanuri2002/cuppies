import React from "react";
import "../styles.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
        <div className="hero" style={{ backgroundImage: "url(/images/bg.png)" }}>
        <h1>Welcome to Cuppies</h1>
      </div>

      {/* Cards Section */}
      <div className="cards">
        <div className="card">
          <h2>Our Signature Cupcakes</h2>
          <p>
            Try our best-selling cupcakes with rich flavors and unique toppings.
            Every bite is a delight!
          </p>
        </div>
        <div className="card">
          <h2>Seasonal & Limited Editions</h2>
          <p>
            Enjoy our limited-time cupcakes, inspired by seasonal fruits and festive
            occasions. Don’t miss out!
          </p>
        </div>
        <div className="card">
          <h2>Made just for you!</h2>
          <p>
            Celebrate your special moments with custom cupcakes. Choose flavors,
            colors, and designs your way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
