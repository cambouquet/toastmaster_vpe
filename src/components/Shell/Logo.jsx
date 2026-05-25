import React from 'react';

export const Logo = ({ className = '', style = {}, primaryColor = '#ffffff', glowColor = '#ff0044' }) => (
  <div className={`logo-kanji-wrap ${className}`} style={style}>
    <svg viewBox='0 0 100 100' style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="logo-accent-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feFlood floodColor={glowColor} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g>
        {/* Main Pillar - Thickened for visibility */}
        <path d='M16 95 L22 5 L30 95 Z' fill={primaryColor} />
        
        {/* The Edge / Wing */}
        <path d='M25 40 Q65 5 96 22 L38 52 Z' fill={glowColor} className="kfont-wing" filter="url(#logo-accent-glow)" />
        
        {/* Base Support */}
        <path d='M14 52 L35 66 L30 72 L10 56 Z' fill={primaryColor} />
        
        {/* Lower Tail */}
        <path d='M25 63 Q65 85 98 98 L88 98 Q58 85 25 68 Z' fill={primaryColor} />
      </g>
    </svg>
  </div>
);
