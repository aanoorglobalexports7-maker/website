import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, X, ShieldCheck, Package, Globe, Layers } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const Products = ({ openQuoteModal }) => {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(el => el != null);
      const totalCards = cardElements.length;

      if (loading || totalCards === 0) return;

      // Set initial positions
      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "120%", scale: 1, rotation: 0 }); // 120% to fully clear bottom
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.85,
            rotation: -4,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container, dependencies: [products, loading] }
  );

  if (loading) {
    return (
      <section id="products" className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-outfit text-emerald-700 animate-pulse">Loading Premium Products...</div>
      </section>
    );
  }

  return (
    <ReactLenis root>
      <section 
        id="products" 
        className="w-full bg-cover bg-center bg-fixed relative overflow-hidden" 
        style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")' }}
        ref={container}
      >
        {/* Grass Overlay */}
        <img 
          src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png" 
          alt="Grass background" 
          className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
        />

        <div className="sticky-cards relative flex h-screen w-full flex-col items-center justify-start pt-16 md:pt-24 pb-6 md:pb-12 px-4 md:px-6 z-20">
          
          {/* Header */}
          <div className="text-center mb-4 md:mb-10 w-full z-10 shrink-0">
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-[#0f172a] mb-2 md:mb-4 tracking-tight">
              Our Export Products
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm md:text-base font-sans max-w-2xl mx-auto">
              Discover our core range of premium agricultural products sourced for global markets.<br/>
              <span className="inline-block mt-2 md:mt-3 text-[10px] md:text-xs uppercase tracking-widest text-emerald-600 font-semibold animate-pulse">
                Scroll Down to view all
              </span>
            </p>
          </div>

          {/* Cards Stack Container */}
          <div className="relative h-[460px] md:h-[480px] w-full max-w-[340px] md:max-w-[400px] shrink-0">
            {products.map((product, i) => (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col will-change-transform"
                style={{ zIndex: i + 1 }}
              >
                {/* Top Half: Image */}
                <div className="h-[200px] md:h-[220px] w-full overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Bottom Half: Content */}
                <div className="p-5 md:p-6 flex-1 flex flex-col bg-white">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 font-sans mb-2 md:mb-3">{product.title}</h3>
                    <p className="text-slate-500 text-[13px] md:text-base leading-relaxed font-sans">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="pt-3 md:pt-4 border-t border-slate-50 mt-auto">
                    <button 
                      onClick={(e) => { e.preventDefault(); setSelectedProduct(product); }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group"
                    >
                      View Full Details
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 w-10 h-10 bg-white shadow-lg border border-gray-100 hover:bg-gray-50 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-slate-800" />
            </button>
            
            <div className="flex flex-col md:flex-row">
              {/* Image side */}
              <div className="w-full md:w-[40%] h-[250px] md:h-auto shrink-0 relative">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Content side */}
              <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col">
                <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-900 mb-2">{selectedProduct.title}</h2>
                <p className="text-slate-600 font-sans mb-8 leading-relaxed border-b border-slate-100 pb-6">{selectedProduct.description}</p>
                
                <div className="space-y-8 font-sans">
                  {selectedProduct.qualityAssurance && (
                    <div className="flex gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Quality Assurance</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">{selectedProduct.qualityAssurance}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.packagingDetails && (
                    <div className="flex gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Packaging Details</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">{selectedProduct.packagingDetails}</p>
                      </div>
                    </div>
                  )}
                  {selectedProduct.globalShipping && (
                    <div className="flex gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Global Shipping</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">{selectedProduct.globalShipping}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedProduct.variants && (
                    <div className="flex gap-4">
                      <div className="mt-1 w-10 h-10 shrink-0 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">
                        <Layers size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Available Variants / Sizes</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProduct.variants.split(',').map((variant, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200">
                              {variant.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.preventDefault();
                      setSelectedProduct(null);
                      openQuoteModal(e);
                    }}
                    className="w-full md:w-auto inline-flex justify-center items-center gap-2 bg-[#16a34a] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-green-900/20 hover:bg-[#15803d] transition-colors"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ReactLenis>
  );
};

export default Products;
