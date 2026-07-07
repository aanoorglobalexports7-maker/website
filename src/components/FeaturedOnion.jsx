import React, { useRef, useState, useEffect } from 'react';
import './FeaturedOnion.css';
import { Hand } from 'lucide-react';
import onionRoundImg from '../assets/onion_round.png';
import onionFieldImg from '../assets/onion_field.png';

const FeaturedOnion = () => {
  const containerRef = useRef(null);
  const [onionPos, setOnionPos] = useState(10); // percentage 10 to 90
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !isHovering) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      // Calculate percentage, constrain between 10% and 90%
      let percentage = (x / rect.width) * 100;
      if (percentage < 10) percentage = 10;
      if (percentage > 90) percentage = 90;
      
      setOnionPos(percentage);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <section className="section featured-onion-section">
      <div className="container text-center mb-5">
        <h2>From Our Farms to Your Hands</h2>
        <p>Move your mouse across the field below to see our premium onions travel straight to you.</p>
      </div>

      <div 
        className="interactive-field"
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setOnionPos(10); // reset to plant
        }}
        style={{ backgroundImage: `url(${onionFieldImg})` }}
      >
        <div className="field-overlay"></div>
        
        <div className="track-container">
          {/* The Plant Area (Left) */}
          <div className="track-point plant-point">
            <div className="point-label">The Farm</div>
          </div>
          
          {/* The Hand Area (Right) */}
          <div className="track-point hand-point">
            <Hand size={48} className="hand-icon" />
            <div className="point-label mt-2">Your Hand</div>
          </div>

          {/* The Moving Onion */}
          <div 
            className="moving-onion-wrapper"
            style={{ 
              left: `${onionPos}%`,
              transform: `translate(-50%, -50%) rotate(${onionPos * 3}deg)`
            }}
          >
            <img src={onionRoundImg} alt="Premium Onion" className="moving-onion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOnion;
