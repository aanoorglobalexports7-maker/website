import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Users, ShieldCheck, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative overflow-hidden" id="home">
      <div className="hero-image-bg"></div>
      <div className="hero-overlay"></div>
      <div className="hero-pattern" aria-hidden="true"></div>
      
      <div className="hero-split-container">
        <div className={`hero-left ${isVisible ? 'visible' : ''}`}>
          <div className="hero-eyebrow">🌿 Trusted by 1000+ Partners Worldwide</div>
          <h1 className="hero-main-title">
            South India's Premier Trade & Sourcing Company
            <span className="hero-highlight-text">Export Solutions</span>
          </h1>
          <p className="hero-main-subtitle">
            Seamless sourcing, trade & market expansion — from South India to the world.
          </p>
          
          <div className="hero-cta-group">
            <button onClick={scrollToProducts} className="hero-btn hero-btn-primary">
              Explore Products <ArrowRight className="hero-btn-icon" />
            </button>
            <button onClick={scrollToContact} className="hero-btn hero-btn-secondary">
              Contact Us
            </button>
          </div>
          
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Countries Served</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">1000+</span>
              <span className="hero-stat-label">Partners Worldwide</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">99.8%</span>
              <span className="hero-stat-label">On-time Delivery</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Support</span>
            </div>
          </div>
        </div>

        <div className={`hero-right ${isVisible ? 'visible' : ''}`}>
          <div className="hero-stats-dock">
            <div className="hero-stats-card hero-stats-card--left float-anim-1">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <Globe className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">50+</span>
                  <span className="hero-stats-label">Countries Served</span>
                </div>
              </div>
            </div>
            
            <div className="hero-stats-card hero-stats-card--right float-anim-2">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <Users className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">1000+</span>
                  <span className="hero-stats-label">Global Partners</span>
                </div>
              </div>
            </div>
            
            <div className="hero-stats-card hero-stats-card--left float-anim-3">
              <div className="hero-stats-card-inner">
                <div className="hero-stats-icon-box">
                  <ShieldCheck className="hero-stats-icon" />
                </div>
                <div className="hero-stats-info">
                  <span className="hero-stats-number">99.8%</span>
                  <span className="hero-stats-label">On-Time Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">Scroll to explore</span>
        <div className="scroll-arrow-anim">
          <ChevronDown className="hero-scroll-arrow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
