import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="relative bg-gray-900 text-white h-72 flex items-center">
        {/* Overlay text (aligned right) */}
        <div className="relative ml-auto mr-12 text-right">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="max-w-md text-gray-200">
            Discover our passion for crafting the perfect cup of coffee and creating moments that matter.
          </p>
        </div>

        {/* Background image (optional) */}
        <img
          src="/images/bg3.png"
          alt="Coffee Beans"
          className="absolute inset-0 w-full h-full opacity-40"
        />
      </header>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2018 in the heart of Amsterdam, Barista began as a small coffee shop with a big dream —
            to bring the world’s finest coffee experiences to every cup. Our beans are ethically sourced from
            sustainable farms, ensuring every sip supports both people and the planet.
          </p>
        </div>

        <img
          src="/images/bg2.png"
          alt="Barista Shop"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />
      </section>
    </div>
  );
};

export default AboutUs;
