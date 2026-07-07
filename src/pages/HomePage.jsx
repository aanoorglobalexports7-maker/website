import React from 'react';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import About from '../components/About';
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import ExportProcess from '../components/ExportProcess';
import GlobalReach from '../components/GlobalReach';
import Statistics from '../components/Statistics';
import CTA from '../components/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <TrustSection />
      <About />
      <Products />
      <WhyChooseUs />
      <ExportProcess />
      <GlobalReach />
      <Statistics />
      <CTA />
    </>
  );
};

export default HomePage;
