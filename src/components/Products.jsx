import React from 'react';
import ProductCard from './ProductCard';
import './Products.css';
import { productsData } from '../data/products';

const Products = () => {
  return (
    <section id="products" className="section section-bg">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Our Export Products</h2>
          <p>Discover our core range of premium agricultural products sourced for global markets.</p>
        </div>
        
        <div className="products-grid">
          {productsData.map((product, index) => (
            <ProductCard 
              key={index}
              title={product.title}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
        
        <div className="text-center mt-5">
          <p className="more-products">Looking for something else?</p>
          <a href="#contact" className="btn-primary">Contact Us for Specific Requirements</a>
        </div>
      </div>
    </section>
  );
};

export default Products;
