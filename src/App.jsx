import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AtelierHero from './components/AtelierHero';
import Products from './components/Products';
import ExportProcess from './components/ExportProcess';
import WhyChooseUs from './components/WhyChooseUs';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuoteModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsQuoteModalOpen(true);
  };

  const LandingPage = () => (
    <>
      <Helmet>
        <title>Aanoor Global Exports | Premium Agricultural Exports</title>
        <meta name="description" content="Delivering trusted agricultural products to global markets with uncompromising quality, reliable sourcing, and long-term business partnerships." />
      </Helmet>
      
      <main className="w-full min-h-screen bg-black">
        <AtelierHero openQuoteModal={openQuoteModal} />
        <Products openQuoteModal={openQuoteModal} />
        <ExportProcess />
        <WhyChooseUs />
        <Footer openQuoteModal={openQuoteModal} />
      </main>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );

  return (
    <HelmetProvider>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
