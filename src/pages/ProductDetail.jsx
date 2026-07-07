import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Box, PlaneTakeoff } from 'lucide-react';
import { productsData } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        
        <Link to="/#products" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="detail-grid">
          <div className="detail-image-wrapper card fade-in">
            <img src={product.image} alt={product.title} className="detail-image" />
          </div>
          
          <div className="detail-content fade-up">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-desc">{product.description}</p>

            <div className="detail-spec-box">
              <h4>
                <CheckCircle2 size={24} className="spec-icon text-green" />
                Quality Assurance
              </h4>
              <p>{product.quality}</p>
            </div>

            <div className="detail-spec-box">
              <h4>
                <Box size={24} className="spec-icon text-blue" />
                Packaging Details
              </h4>
              <p>{product.packaging}</p>
            </div>
            
            <div className="detail-spec-box border-none pb-0">
              <h4>
                <PlaneTakeoff size={24} className="spec-icon text-gold" />
                Global Shipping
              </h4>
              <p>We partner with leading freight forwarders to ensure timely delivery via sea or air freight to any major port worldwide. Customs clearance documentation is fully handled by our expert team.</p>
            </div>

            <div className="detail-actions">
              <a href="/#contact" className="btn-primary btn-large w-100 text-center">
                Request a Quote for {product.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
