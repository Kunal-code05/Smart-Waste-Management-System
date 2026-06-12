import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Dummy submit
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--primary-dark)' }}>Contact Us</h1>

        <div className="grid grid-cols-2">
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
              Have a question or facing an issue? Send us a message and our support team will get back to you as soon as possible.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '50%' }}>
                  <Mail color="#10B981" size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Email</h4>
                  <span style={{ color: 'var(--text-light)' }}>support@ecowaste.com</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '50%' }}>
                  <Phone color="#10B981" size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Phone</h4>
                  <span style={{ color: 'var(--text-light)' }}>+91-8446342686</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '50%' }}>
                  <MapPin color="#10B981" size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Location</h4>
                  <span style={{ color: 'var(--text-light)' }}>Cybage Towers, Survey No. 13A/ 1,2,3/1, Wadgaon Sheri, Pune, Maharashtra 411014</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
            {submitted ? (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7', borderRadius: '8px', color: '#15803d' }}>
                Thank you! Your message has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
