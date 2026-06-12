import React from 'react';
import { Users, Target, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        <div className="glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-dark)' }}>About EcoWaste</h1>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-light)' }}>
            EcoWaste is a Smart Waste Management System dedicated to maintaining clean, sustainable, and eco-friendly urban environments. We bridge the gap between citizens, waste management authorities, and collection staff through an intuitive, real-time platform.
          </p>
        </div>

        <div className="grid grid-cols-3">
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <Target color="#10B981" size={40} style={{ marginBottom: '1rem' }} />
             <h3>Our Mission</h3>
             <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>To revolutionize waste management by empowering citizens and optimizing collection routes for a greener tomorrow.</p>
          </div>
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <Zap color="#0ea5e9" size={40} style={{ marginBottom: '1rem' }} />
             <h3>Efficiency</h3>
             <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>We use smart tracking and direct assignment to reduce response times and fuel consumption during waste collection.</p>
          </div>
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <Users color="#f59e0b" size={40} style={{ marginBottom: '1rem' }} />
             <h3>Community Driven</h3>
             <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>We believe a clean city is a collaborative effort. By giving everyone a voice, we ensure no corner goes unnoticed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
