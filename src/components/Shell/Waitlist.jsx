import React, { useState } from 'react';
import { Logo } from './Logo';
import './Waitlist.scss';

export const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Transmission failed:', err);
    }
  };

  const accent = import.meta.env.VITE_WING_COLOR || '#00bac4';

  return (
    <div className="waitlist-container">
      <div className="vignette" />
      <div className="waitlist-content">
        <Logo primaryColor="#ffffff" glowColor={accent} />
        <div className="motto" style={{ color: accent, textShadow: `0 0 10px ${accent}88` }}>COMING SOON</div>
        <div className="description">
          A new way to master the art of speaking.
        </div>
        {submitted ? (
          <div className="success-msg" style={{ color: accent }}>ESTABLISHED. WE'LL REACH OUT.</div>
        ) : (
          <form onSubmit={handleSubmit} className="waitlist-form">
            <input 
              type="email" 
              placeholder="NEURAL_ID@DOMAIN.COM" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" style={{ background: accent }}>JOIN TRANSMISSION</button>
          </form>
        )}
      </div>
    </div>
  );
};