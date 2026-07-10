import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = ({ openQuoteModal }) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="footer-canvas">
      <div className="footer-card">
        <div className="footer-columns-grid">
          
          <div className="footer-col footer-col--brand">
            <div className="footer-logo-wrapper" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>Aanoor Global Exports</h2>
            </div>
            <ul className="footer-contact-details">
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <span className="footer-contact-text">+91 89039 58910</span>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <span className="footer-contact-text">support@aanoorglobalexports.com</span>
              </li>
              <li className="footer-contact-item">
                <Clock className="footer-contact-icon" />
                <span className="footer-contact-text">Mon - Sat: 9:00 AM - 6:00 PM (IST)</span>
              </li>
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span className="footer-contact-text">
                  Aanoor Global Exports<br />
                  Building No. 353, Arumuthu GR, CK Palayam Pirivu<br />
                  Chinnapudhur, Dharapuram<br />
                  Tiruppur, Tamil Nadu – 638657, India
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col--links">
            <h3 className="footer-col-header">Quick Links</h3>
            <ul className="footer-link-stack">
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="footer-text-link">Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="footer-text-link">About Us</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="footer-text-link">Products</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="footer-text-link">Contact</a></li>
            </ul>
          </div>



        </div>

        <hr className="footer-transition-line" />
        
        <div className="footer-cta-row">
          <h4 className="footer-cta-heading">Get in touch</h4>
          <button type="button" onClick={openQuoteModal} className="footer-cta-btn">
            Connect with Our Experts <ArrowRight style={{ marginLeft: '8px' }} size={20} />
          </button>
        </div>
        
        <p className="footer-narrative-relocated">
          Connecting global markets with seamless supply chains and premium quality sourcing.<br />
          Empowering your trade journey with absolute efficiency.
        </p>

        <hr className="footer-transition-line" />

        <div className="footer-baseline-row">
          <p className="footer-copyright-text">
            © 2026 Aanoor Global Exports. All rights reserved. | Premier Trade & Sourcing Co.
          </p>
          <div className="footer-baseline-right">
            <button className="footer-legal-link">Terms of Use</button>
            <span className="footer-legal-divider">•</span>
            <button className="footer-legal-link">Privacy Policy</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
