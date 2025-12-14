import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        About Us
      </h1>
        {/* Text */}
        <div className="space-y-6 text-gray-700">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            Garments Tracker is dedicated to helping small and medium-sized
            garment factories manage their orders, production workflow, and
            delivery process efficiently. We strive to provide the best tools
            for smooth operations.
          </p>

          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p>
            To become the leading digital platform for garment factories by
            offering a modern, easy-to-use system that ensures transparency,
            efficiency, and timely delivery of orders.
          </p>
        </div>
      </div>
  );
};

export default AboutUs;