import React from 'react';

export const HomeLogo = ({ className = '', style = {} }) => (
  <div className={`logo-home-wrap ${className}`} style={{ ...style, display: 'inline-flex' }}>
    <svg viewBox='0 0 100 100' style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="home-cyan-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feFlood floodColor="#00bac4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#00bac4" strokeWidth="4" filter="url(#home-cyan-glow)">
        {/* Primal Apex - Roof with high-tension peak */}
        <path d="M50 15 L85 45 L85 85 L15 85 L15 45 Z" strokeWidth="3" opacity="0.4" />
        <path d="M10 50 L50 15 L90 50" strokeWidth="6" strokeLinecap="square" />
        
        {/* Core Entryway - Neural Gate */}
        <path d="M40 85 L40 55 L60 55 L60 85" strokeWidth="4" />
        
        {/* HUD Targeting Elements */}
        <path d="M25 65 h10 M65 65 h10" strokeWidth="2" opacity="0.6" />
        <path d="M50 35 v10" strokeWidth="2" opacity="0.8" />
        
        {/* Corner Brackets */}
        <path d="M15 75 L15 85 L25 85" strokeWidth="2" />
        <path d="M75 85 L85 85 L85 75" strokeWidth="2" />
      </g>
    </svg>
  </div>
);
