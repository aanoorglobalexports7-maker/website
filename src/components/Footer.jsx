import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
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
              <li><a href="#home" className="footer-text-link">Home</a></li>
              <li><a href="#about" className="footer-text-link">About Us</a></li>
              <li><a href="#products" className="footer-text-link">Products</a></li>
              <li><a href="#contact" className="footer-text-link">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col footer-col--services">
            <h3 className="footer-col-header">Services</h3>
            <ul className="footer-link-stack">
              <li><button className="footer-text-link">Fresh Fruits Sourcing</button></li>
              <li><button className="footer-text-link">Organic Vegetables Import</button></li>
              <li><button className="footer-text-link">Premium Spices Trade</button></li>
              <li><button className="footer-text-link">Grains & Pulses Distribution</button></li>
              <li><button className="footer-text-link">Bulk Procurement & Logistics</button></li>
            </ul>
          </div>

          <div className="footer-col footer-col--solutions">
            <h3 className="footer-col-header">Solutions</h3>
            <ul className="footer-link-stack">
              <li><button className="footer-text-link">Sourcing & Supply Chain</button></li>
              <li><button className="footer-text-link">Custom Packaging</button></li>
              <li><button className="footer-text-link">Global Freight & Customs</button></li>
              <li><button className="footer-text-link">Warehousing & Cold Chain</button></li>
            </ul>
            
            <div className="footer-follow-section">
              <span className="footer-follow-label">Follow Us</span>
              <div className="footer-social-row">
                <a href="#" className="footer-social-icon-node" aria-label="Facebook">
                  <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="footer-social-icon-node" aria-label="Instagram">
                  <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="footer-social-icon-node" aria-label="LinkedIn">
                  <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <hr className="footer-transition-line" />
        
        <div className="footer-cta-row">
          <h4 className="footer-cta-heading">Get in touch</h4>
          <a href="#contact" className="footer-cta-btn">
            Connect with Our Experts <ArrowRight style={{ marginLeft: '8px' }} size={20} />
          </a>
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
