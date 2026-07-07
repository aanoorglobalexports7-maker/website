import React from 'react';
import { Shield, Award, Clock, FileText, Heart, Handshake } from 'lucide-react';
import './TrustSection.css';

const TrustSection = () => {
  const trustPoints = [
    { icon: <Shield size={28} />, title: "Reliable Sourcing", desc: "Ethical and consistent supply chain." },
    { icon: <Award size={28} />, title: "Consistent Quality", desc: "Stringent quality control measures." },
    { icon: <Clock size={28} />, title: "Timely Shipment", desc: "Punctual global delivery." },
    { icon: <FileText size={28} />, title: "Professional Export Documentation", desc: "Hassle-free customs clearance." },
    { icon: <Heart size={28} />, title: "Customer-First Approach", desc: "Dedicated support for buyers." },
    { icon: <Handshake size={28} />, title: "Long-Term Partnerships", desc: "Building sustainable business relations." },
  ];

  return (
    <section className="section section-bg trust-section">
      <div className="container">
        <div className="text-center mb-4">
          <h2>Why Global Buyers Trust Us</h2>
          <p>We are committed to delivering excellence at every step of the export process.</p>
        </div>
        <div className="trust-grid">
          {trustPoints.map((point, index) => (
            <div key={index} className="trust-card card">
              <div className="trust-icon">{point.icon}</div>
              <h4>{point.title}</h4>
              <p>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
