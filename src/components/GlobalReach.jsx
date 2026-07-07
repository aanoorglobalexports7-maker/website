import React from 'react';
import './GlobalReach.css';

const GlobalReach = () => {
  const regions = [
    "Middle East",
    "Europe",
    "Asia",
    "North America",
    "Africa",
    "Oceania"
  ];

  return (
    <section id="global" className="section global-reach">
      <div className="container text-center">
        <h2>Our Global Reach</h2>
        <p className="global-desc">
          Serving international buyers with dependable export solutions and efficient global logistics.
        </p>
        
        <div className="regions-grid">
          {regions.map((region, index) => (
            <div key={index} className="region-card card">
              <h4>{region}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
