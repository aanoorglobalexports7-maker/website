import React from 'react';
import './ExportProcess.css';
import sourcingImg from '../assets/product_sourcing.png';
import inspectionImg from '../assets/quality_inspection.png';
import packagingImg from '../assets/export_packaging.png';
import documentationImg from '../assets/export_documentation.png';
import shippingImg from '../assets/freight_shipping.png';
import deliveryImg from '../assets/worldwide_delivery.png';

const ExportProcess = () => {
  const steps = [
    {
      id: 1,
      title: 'Product Sourcing',
      desc: 'Procuring from trusted farms.',
      img: sourcingImg,
      align: 'left'
    },
    {
      id: 2,
      title: 'Quality Inspection',
      desc: 'Rigorous testing and sorting.',
      img: inspectionImg,
      align: 'right'
    },
    {
      id: 3,
      title: 'Packaging',
      desc: 'Export-grade custom packaging.',
      img: packagingImg,
      align: 'left'
    },
    {
      id: 4,
      title: 'Documentation',
      desc: 'Customs and compliance paperwork.',
      img: documentationImg,
      align: 'right'
    },
    {
      id: 5,
      title: 'Shipping',
      desc: 'Loading and freight forwarding.',
      img: shippingImg,
      align: 'left'
    },
    {
      id: 6,
      title: 'Worldwide Delivery',
      desc: 'Safe arrival at destination port.',
      img: deliveryImg,
      align: 'right'
    }
  ];

  return (
    <section 
      id="services"
      className="tl-section bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85")' }}
    >
      {/* Grass Overlay */}
      <img 
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png" 
        alt="Grass background" 
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
      />
      <div className="tl-header relative z-20">
        <span className="tl-eyebrow">How We Deliver</span>
        <h2 className="tl-title font-outfit">Our Export Process</h2>
        <p className="tl-subtitle font-sans">A streamlined and transparent process to ensure your goods arrive safely and on time.</p>
      </div>

      <div className="tl-rows relative z-20">
        <div className="tl-spine-container" aria-hidden="true">
          <div className="tl-spine-line"></div>
        </div>

        {steps.map((step, index) => (
          <div key={step.id} className={`tl-row tl-row--img-${step.align}`}>
            <div className="tl-img-wrap">
              <img src={step.img} alt={step.title} className="tl-img" loading="lazy" />
              <div className="tl-img-ring" aria-hidden="true"></div>
            </div>
            
            <div className="tl-dot-wrap" aria-hidden="true">
              <div className="tl-dot"><span className="tl-dot-inner"></span></div>
            </div>
            
            <div className="tl-text-wrap font-sans">
              <span className="tl-step-label font-outfit">Step 0{step.id}</span>
              <h3 className="tl-step-title font-outfit">{step.title}</h3>
              <p className="tl-step-body font-sans">{step.desc}</p>
              <div className="tl-accent-line" aria-hidden="true"></div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ExportProcess;
