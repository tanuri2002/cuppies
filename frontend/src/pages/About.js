import React from "react";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header" style={{ backgroundImage: "url(/images/about-hero.png)" }}>
        <div className="header-overlay">
          <div className="header-content">
            <h1>About Cuppies</h1>
            <p>
              Baking happiness into every bite since 2018. Discover our journey of
              creating the world's most delightful cupcakes.
            </p>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <div className="section-container">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2024 with a passion for sweet perfection, Cuppies began as a small home-grown venture with a big dream — to bring joy to every celebration through beautifully crafted cupcakes. What started as a simple love for baking has grown into a brand dedicated to creativity, quality, and unforgettable flavors.
            </p>
            <p>
              Our cupcakes are made with carefully selected ingredients, baked fresh with love, and designed to make every moment a little sweeter. At Cuppies, we believe every bite should feel special — because happiness is best shared, one cupcake at a time.
            </p>
          </div>
          <div className="image-content">
            <img
              src="/images/bg2.jpg"
              alt="Our Story"
              className="rounded-image"
            />
          </div>
        </div>
      </section>

      {/* Meet the Bakers Section */}
      <section className="about-section alternate-bg">
        <div className="section-container reverse">
          <div className="text-content">
            <h2>Meet the Bakers</h2>
            <p>
              Our team consists of passionate artisans who live and breathe pastry.
              With years of experience and a splash of creativity, they turn simple
              flour and sugar into edible art.
            </p>
          </div>
          <div className="image-content">
            <img
              src="/images/backers.jpeg"
              alt="Our Passionate Team"
              className="rounded-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
