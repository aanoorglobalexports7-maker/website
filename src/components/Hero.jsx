import React from 'react';
import './Hero.css';
import heroImg from '../assets/hero.png';
import { ShieldCheck, PackageCheck, Globe2, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="fade-up visible">Premium Agricultural Exports from India</h1>
        <p className="hero-subtitle fade-up visible" style={{ transitionDelay: '0.1s' }}>
          Delivering trusted agricultural products to global markets with uncompromising quality, reliable sourcing, and long-term business partnerships.
        </p>
        <div className="hero-actions fade-up visible" style={{ transitionDelay: '0.2s' }}>
          <a href="#contact" className="btn-primary">Request a Quote</a>
          <a href="#contact" className="btn-outline">Contact Us</a>
        </div>
        
        <div className="hero-features fade-up visible" style={{ transitionDelay: '0.3s' }}>
          <div className="feature">
            <ShieldCheck size={20} />
            <span>Trusted Export Partner</span>
          </div>
          <div className="feature">
            <PackageCheck size={20} />
            <span>Quality Assured</span>
          </div>
          <div className="feature">
            <Globe2 size={20} />
            <span>Global Shipping</span>
          </div>
          <div className="feature">
            <Truck size={20} />
            <span>Timely Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
