import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="section cta-section">
      <div className="container text-center">
        <h2 className="cta-title">Looking for a Reliable Agricultural Export Partner?</h2>
        <p className="cta-desc">
          Connect with our team to discuss your sourcing requirements and receive a customized export solution tailored to your business.
        </p>
        <a href="#contact" className="btn-primary cta-btn">Request a Quote</a>
      </div>
    </section>
  );
};

export default CTA;
