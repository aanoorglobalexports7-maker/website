import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CustomCursor from './components/CustomCursor';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const observeElements = () => {
      document.querySelectorAll('.fade-up, .fade-in').forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements();
    
    // Create a MutationObserver to watch for route changes adding new elements
    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <div className="app">
          <Helmet>
            <title>Aanoor Global Exports | Premium Agricultural Exports from India</title>
            <meta name="description" content="Aanoor Global Exports delivers trusted agricultural products to global markets with uncompromising quality, reliable sourcing, and long-term business partnerships." />
            <meta property="og:title" content="Aanoor Global Exports" />
            <meta property="og:description" content="Premium agricultural exports from India to the world." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">
              {`
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Aanoor Global Exports",
                  "url": "https://www.aanoorglobalexports.com",
                  "logo": "https://www.aanoorglobalexports.com/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-89039-58910",
                    "contactType": "customer service"
                  }
                }
              `}
            </script>
          </Helmet>
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          
          <Contact />
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
