import React, { useEffect, useRef, useState } from 'react';
import './Statistics.css';

const StatItem = ({ label, target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = parseInt(target);
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 16);
        
        observer.disconnect();
      }
    });

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-item card" ref={itemRef}>
      <div className="stat-number">
        {target === "Global" ? "Global" : count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="section section-bg">
      <div className="container">
        <div className="stats-grid">
          <StatItem target="100" suffix="+" label="Business Partners" />
          <StatItem target="20" suffix="+" label="Product Categories" />
          <StatItem target="100" suffix="%" label="Quality Commitment" />
          <StatItem target="Global" label="Export Network" />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
