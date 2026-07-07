import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
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
          
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-input" placeholder="Global Imports LLC" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp / Phone Number</label>
                <input type="tel" className="form-input" placeholder="+1 234 567 8900" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country</label>
                <input type="text" className="form-input" placeholder="United States" required />
              </div>
              <div className="form-group">
                <label className="form-label">Product Interested In</label>
                <select className="form-select" required>
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
              <input type="text" className="form-input" placeholder="e.g. 1x20ft Container / 10 Metric Tons" required />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Please provide any specific requirements..." required></textarea>
            </div>

            <button type="submit" className="btn-primary w-100">Send Enquiry</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
