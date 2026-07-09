import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Always show solid navbar if not on homepage, otherwise depend on scroll
      setIsScrolled(location.pathname !== '/' || window.scrollY > 20);
    };
    handleScroll(); // Check immediately on mount/route change
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Products', href: '/#products' },
    { name: 'Why Choose Us', href: '/#why-us' },
    { name: 'Global Export', href: '/#global' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src={logoImg} alt="Aanoor Global Exports" className="logo-img" />
          <span className="logo-text">Aanoor Global Exports</span>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/#contact" className="btn-primary mobile-cta" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/#contact" className="btn-primary desktop-cta">Get a Quote</Link>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
