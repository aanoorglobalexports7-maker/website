import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    product: '',
    quantity: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      
      setIsSuccess(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        country: '',
        product: '',
        quantity: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("There was an error sending your enquiry. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-container">
        
        <div className="contact-info-wrap">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="mb-4">Get in touch with us for premium agricultural exports.</p>
            
            <div className="info-item">
              <Phone className="info-icon" size={24} />
              <div>
                <strong>Phone</strong>
                <p>+91 89039 58910</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="info-icon" size={24} />
              <div>
                <strong>Email</strong>
                <p><a href="mailto:support@aanoorglobalexports.com">support@aanoorglobalexports.com</a></p>
              </div>
            </div>

            <div className="info-item">
              <Clock className="info-icon" size={24} />
              <div>
                <strong>Working Hours</strong>
                <p>Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
              </div>
            </div>
            
            <div className="info-item">
              <MapPin className="info-icon" size={24} />
              <div>
                <strong>Office Address</strong>
                <p>
                  Aanoor Global Exports<br />
                  Building No. 353<br />
                  Arumuthu GR, CK Palayam Pirivu<br />
                  Chinnapudhur, Dharapuram<br />
                  Tiruppur, Tamil Nadu – 638657<br />
                  India
                </p>
              </div>
            </div>
          </div>

          <div className="map-container card">
            <iframe 
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.432645609355!2d77.5186637!3d10.7329596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9a1005a9edaa1%3A0x6b42b5a5b5b4860b!2sDharapuram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="contact-form-wrap card">
          <h3>Send us an Enquiry</h3>
          <p className="mb-4">Fill out the form below and our team will get back to you promptly.</p>
          
          {isSuccess && (
            <div className="success-message" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={20} />
              <span>Thank you! Your enquiry has been sent successfully.</span>
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-input" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-input" placeholder="Global Imports LLC" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp / Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input" placeholder="United States" required />
              </div>
              <div className="form-group">
                <label className="form-label">Product Interested In</label>
                <select name="product" value={formData.product} onChange={handleChange} className="form-select" required>
                  <option value="">Select a Product</option>
                  <option value="Spices">Premium Spices</option>
                  <option value="Coconuts">Coconut Products</option>
                  <option value="Vegetables">Fresh Vegetables</option>
                  <option value="Rice">Rice Varieties</option>
                  <option value="Fruits">Fresh Fruits</option>
                  <option value="Pulses">Grains & Pulses</option>
                  <option value="OilSeeds">Oil Seeds</option>
                  <option value="Herbal">Herbal Products</option>
                  <option value="Other">Other / Request Full Catalogue</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Quantity Required</label>
              <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="form-input" placeholder="e.g. 1x20ft Container / 10 Metric Tons" required />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="form-textarea" placeholder="Please provide any specific requirements..." required></textarea>
            </div>

            <button type="submit" className="btn-primary w-100" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
