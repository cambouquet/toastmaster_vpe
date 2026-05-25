import React from 'react';

export const Logo = ({ className = '', style = {}, scan = false }) => (
  <div className={`logo-kanji-wrap is-white ${className}`} style={style}>
    <svg viewBox='0 0 100 100' style={{ width: '95%', height: '95%' }}>
      <defs>
        <filter id="k-red-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feFlood floodColor="#ff0044" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g>
        <path d='M19 95 L22 5 L25 95 Z' fill="#ffffff" />
        <path d='M25 40 Q65 5 96 22 L38 52 Z' fill="#ff0044" filter="url(#k-red-glow)" />
        <path d='M17 52 L31 66 L27 70 L13 56 Z' fill="#ffffff" />
        <path d='M25 63 Q65 85 98 98 L88 98 Q58 85 25 68 Z' fill="#ffffff" />
      </g>
    </svg>
  </div>
);
