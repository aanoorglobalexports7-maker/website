import React from 'react';
import { PackageCheck, Leaf, Ship, TrendingDown, RefreshCcw, HeadphonesIcon, Globe, Clock } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    { icon: <PackageCheck size={24} />, title: "Quality Assurance", desc: "Multi-level quality checks before shipment." },
    { icon: <Leaf size={24} />, title: "Premium Sourcing", desc: "Direct from farms to ensure freshness." },
    { icon: <Ship size={24} />, title: "Global Logistics", desc: "Efficient sea and air freight partnerships." },
    { icon: <TrendingDown size={24} />, title: "Competitive Pricing", desc: "Value-driven cost structures." },
    { icon: <RefreshCcw size={24} />, title: "Reliable Supply Chain", desc: "Uninterrupted availability of goods." },
    { icon: <HeadphonesIcon size={24} />, title: "Dedicated Support", desc: "24/7 customer service assistance." },
    { icon: <Globe size={24} />, title: "International Standards", desc: "Compliant with global import regulations." },
    { icon: <Clock size={24} />, title: "Timely Delivery", desc: "Strict adherence to delivery schedules." },
  ];

  return (
    <section id="why-us" className="section">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Why Choose Us</h2>
          <p>We are the preferred partner for importers worldwide, delivering unmatched value and trust.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
