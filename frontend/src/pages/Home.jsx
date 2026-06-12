import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
            Smart Waste Management System
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            A cleaner city starts with you. Report issues, schedule pickups, and track waste management effortlessly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Get Started Now
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3" style={{ marginTop: '3rem' }}>
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <MapPin color="#0ea5e9" size={40} />
            </div>
            <h3>Report Garbage</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
              Spotted uncollected garbage? Pin the location and upload an image to notify the authorities instantly.
            </p>
          </div>
          
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <Recycle color="#10B981" size={40} />
            </div>
            <h3>Schedule Pickups</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
              Conveniently schedule waste pickups from your home or business at your preferred date.
            </p>
          </div>

          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <Leaf color="#f59e0b" size={40} />
            </div>
            <h3>Eco-Friendly Tracking</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>
              Track the status of your complaints and requests in real-time until they are resolved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
