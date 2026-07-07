import React from 'react';
import './About.css';
import aboutImg from '../assets/about.png';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container about-container">
        <div className="about-content">
          <h2>About Aanoor Global Exports</h2>
          <p>
            Aanoor Global Exports is committed to delivering premium-quality agricultural products from India to international markets. We focus on quality, transparency, and long-term relationships with global buyers. 
          </p>
          <p>
            Every shipment reflects our dedication to consistency, reliability, and customer satisfaction. Our mission is to connect Indian agriculture with businesses around the world through ethical sourcing, efficient logistics, and dependable export services.
          </p>
          <ul className="about-list">
            <li>Ethical and sustainable sourcing</li>
            <li>Rigorous quality control</li>
            <li>Seamless international logistics</li>
            <li>Dedicated buyer support</li>
          </ul>
        </div>
        <div className="about-image-wrapper">
          <img src={aboutImg} alt="Agricultural Fields in India" className="about-image" />
        </div>
      </div>
    </section>
  );
};

export default About;
