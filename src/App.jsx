import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AtelierHero from './components/AtelierHero';
import Products from './components/Products';
import ExportProcess from './components/ExportProcess';
import WhyChooseUs from './components/WhyChooseUs';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Aanoor Global Exports | Premium Agricultural Exports</title>
        <meta name="description" content="Delivering trusted agricultural products to global markets with uncompromising quality, reliable sourcing, and long-term business partnerships." />
      </Helmet>
      
      <CustomCursor />
      
      <main className="w-full min-h-screen bg-black">
        <AtelierHero />
        <Products />
        <ExportProcess />
        
        <WhyChooseUs />
        <Footer />
      </main>
    </HelmetProvider>
  );
}

export default App;
