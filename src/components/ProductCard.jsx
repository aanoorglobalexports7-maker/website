import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ title, description, image }) => {
  // Convert title to a URL-friendly slug (e.g. "Big Onion" -> "big-onion")
  const slug = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="product-card card">
      <Link to={`/product/${slug}`} className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        <div className="view-quality-overlay">
          <span>View Full Details</span>
        </div>
      </Link>
      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/product/${slug}`} className="product-link btn-text">
          View Full Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
