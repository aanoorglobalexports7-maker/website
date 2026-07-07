import React from 'react';
import { Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo mb-3">
              <Globe className="logo-icon" size={28} />
              <span className="logo-text">Aanoor Global Exports</span>
            </div>
            <p className="footer-slogan">Where Trust Moves Markets.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact Information</h4>
            <ul>
              <li>Email: <a href="mailto:support@aanoorglobalexports.com">support@aanoorglobalexports.com</a></li>
              <li>Phone: +91 89039 58910</li>
              <li>Address: Building No. 353, Arumuthu GR, CK Palayam Pirivu, Chinnapudhur, Dharapuram, Tiruppur, Tamil Nadu – 638657, India</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Aanoor Global Exports. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
