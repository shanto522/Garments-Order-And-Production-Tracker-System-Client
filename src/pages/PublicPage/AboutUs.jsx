import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        About Garments Tracker
      </h1>

      {/* Intro */}
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-14 text-lg">
        Garments Tracker is a modern web-based management system designed to
        simplify garment manufacturing operations by ensuring transparency,
        efficiency, and control at every stage of production.
      </p>

      {/* Content Sections */}
      <div className="space-y-10 text-gray-700">
        {/* Mission */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>
            Our mission is to empower small and medium-sized garment factories
            with digital tools that help them manage products, orders,
            production workflows, and deliveries efficiently. We aim to reduce
            manual errors, save time, and improve overall productivity through
            smart automation.
          </p>
        </div>

        {/* Vision */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p>
            We envision a future where garment factories operate with complete
            digital transparency, real-time tracking, and data-driven decision
            making. Garments Tracker strives to become a trusted platform for
            modern manufacturing management.
          </p>
        </div>

        {/* What We Do */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
          <p>
            Garments Tracker provides a centralized system where factory
            owners, managers, and customers can collaborate seamlessly. The
            platform allows users to track products, monitor stock levels,
            manage orders, and oversee production progress from a single
            dashboard.
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Role-based access control (Admin, Manager, Customer, Demo)</li>
            <li>Product and inventory management</li>
            <li>Order tracking and booking system</li>
            <li>Secure authentication with Email & Google login</li>
            <li>Read-only demo access for recruiters and clients</li>
            <li>Modern, responsive, and user-friendly UI</li>
          </ul>
        </div>

        {/* Technology */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Technology Stack</h2>
          <p>
            This project is built using modern web technologies including
            React, Tailwind CSS, Firebase Authentication, MongoDB, and a secure
            Node.js & Express backend. The system is deployed on Firebase
            Hosting to ensure fast and reliable performance.
          </p>
        </div>

        {/* Commitment */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Our Commitment</h2>
          <p>
            We are committed to continuous improvement, scalability, and data
            security. Garments Tracker is designed with real-world business
            needs in mind and can be easily extended as factories grow and
            operational demands increase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
