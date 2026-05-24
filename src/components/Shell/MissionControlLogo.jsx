import React from 'react';

export const MissionControlLogo = ({ style = {} }) => (
  <div className="logo-wrap" style={{ color: 'inherit', width: 24, height: 24, ...style }}>
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* 2077 MISSION CONTROL: NEURAL_HEX_OAK */}
      <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" fill="none" stroke="currentColor" strokeWidth="6" />
      
      {/* Central Command Core (Fractured) */}
      <path d="M45 45h10v10H45z" />
      <path d="M48 35h4v6h-4zM48 59h4v6h-4zM35 48h6v4h-6zM59 48h6v4h-6z" opacity="0.6" />

      {/* Targeting Recticle / HUD Elements */}
      <path d="M10 28 L30 28 M10 72 L30 72 M90 28 L70 28 M90 72 L70 72" fill="none" stroke="currentColor" strokeWidth="4" />
      
      {/* Neural Link Nodes */}
      <circle cx="50" cy="20" r="3" /><circle cx="50" cy="80" r="3" />
      <circle cx="25" cy="50" r="3" /><circle cx="75" cy="50" r="3" />
    </svg>
  </div>
);