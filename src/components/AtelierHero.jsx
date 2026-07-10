import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ShieldCheck, Package, Globe, Truck, X } from 'lucide-react';

const AtelierHero = ({ openQuoteModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Products', id: 'products' },
    { name: 'Contact Us', id: 'contact' }
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="w-full h-[100dvh] overflow-hidden relative bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4"
      />
      {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Shipyon-style Navbar */}
        <nav className="mx-auto mt-6 w-[94%] max-w-7xl bg-[#f4f4f5]/95 backdrop-blur-md rounded-full flex items-center justify-between px-6 md:px-8 py-3.5 shadow-xl z-50">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-[#2d3748] font-bold text-xl tracking-tight font-outfit">
              Aanoor Global Exports
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0] px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
              Home
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              About
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Services
            </a>
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Products
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Contact Us
            </a>
          </div>

          {/* Mobile Toggle (Hamburger) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 group"
            aria-label="Toggle menu"
          >
            <div
              className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] w-6 shadow-sm ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : '-translate-y-1.5'
              }`}
            />
            <div
              className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] w-4 group-hover:w-6 shadow-sm ${
                isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <div
              className={`h-[2.5px] bg-gray-800 rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] w-6 shadow-sm ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : 'translate-y-1.5'
              }`}
            />
          </button>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center pb-12 px-6 text-center w-full">
          <h1 className="font-outfit text-white text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] max-w-5xl tracking-tighter uppercase font-extrabold drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Premium Agricultural<br />
            Exports from India
          </h1>
          
          <p className="mt-6 text-white/90 text-sm md:text-base lg:text-lg font-medium max-w-2xl leading-relaxed font-sans drop-shadow-lg">
            Delivering trusted agricultural products to global markets with uncompromising quality, reliable sourcing, and long-term business partnerships.
          </p>
          
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-5">
            <button onClick={openQuoteModal} className="group flex items-center justify-center gap-2 bg-white text-black rounded-full px-8 py-3.5 text-sm md:text-base font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-xl">
              Request a Quote
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="group flex items-center justify-center gap-2 bg-black/30 backdrop-blur-md border border-white/40 text-white rounded-full px-8 py-3.5 text-sm md:text-base font-semibold hover:bg-black/50 hover:border-white/80 transition-all duration-300 shadow-xl hover:scale-105">
              Contact Us
              <Play size={18} className="fill-transparent" />
            </a>
          </div>

          {/* Features Strip */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16 text-white">
            <div className="flex items-center gap-2.5 drop-shadow-md">
              <ShieldCheck size={22} className="text-white" />
              <span className="text-sm sm:text-base font-medium font-sans">Trusted Export Partner</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-md">
              <Package size={22} className="text-white" />
              <span className="text-sm sm:text-base font-medium font-sans">Quality Assured</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-md">
              <Globe size={22} className="text-white" />
              <span className="text-sm sm:text-base font-medium font-sans">Global Shipping</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow-md">
              <Truck size={22} className="text-white" />
              <span className="text-sm sm:text-base font-medium font-sans">Timely Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
        
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
        
        <div className="relative h-full flex flex-col px-6 pt-24 pb-8">
          <div className="flex-1 flex flex-col justify-center">
            {menuLinks.map((link, index) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="group border-b border-white/10 py-5 overflow-hidden block"
              >
                <div
                  className={`text-white font-outfit font-bold text-4xl sm:text-5xl transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:pl-4 ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${150 + index * 80}ms` : '0ms' }}
                >
                  {link.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtelierHero;
