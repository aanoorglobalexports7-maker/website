import React from 'react';
import './ExportProcess.css';

const ExportProcess = () => {
  const steps = [
    { num: "01", title: "Product Sourcing", desc: "procuring from trusted farms" },
    { num: "02", title: "Quality Inspection", desc: "Rigorous testing and sorting" },
    { num: "03", title: "Packaging", desc: "Export-grade custom packaging" },
    { num: "04", title: "Documentation", desc: "Customs and compliance paperwork" },
    { num: "05", title: "Shipping", desc: "Loading and freight forwarding" },
    { num: "06", title: "Worldwide Delivery", desc: "Safe arrival at destination port" },
  ];

  return (
    <section className="section section-bg">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Our Export Process</h2>
          <p>A streamlined and transparent process to ensure your goods arrive safely and on time.</p>
        </div>

        <div className="timeline-container">
          {steps.map((step, index) => (
            <div key={index} className="timeline-step card">
              <div className="step-number">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportProcess;
