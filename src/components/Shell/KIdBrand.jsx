import React from 'react';

export const KIdBrand = ({ className = '' }) => (
  <svg viewBox='0 0 240 80' fill='currentColor' className={className} style={{ height: '50px' }}>
    {/* K - Full Fidelity Logo-Typeface */}
    <g transform='translate(5, 0)'>
      <path d='M12 76 L15 4 L18 76 Z' />
      <path d='M18 32 Q50 4 75 18 L28 42 Z' />
      <path d='M10 42 L21 53 L18 56 L7 45 Z' />
      <path d='M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z' />
    </g>
    {/* DASH - Geometric Typeface */}
    <rect x='85' y='38' width='15' height='4' rx='1' />
    {/* I - Derived from Stem Geometry */}
    <path d='M115 76 L118 4 L121 76 Z' />
    {/* D - Stem Geometry + Curved Arm Logic */}
    <g transform='translate(135, 0)'>
      <path d='M5 76 L8 4 L11 76 Z' />
      <path d='M11 4 Q65 4 65 40 Q65 76 11 76 L11 66 Q52 66 52 40 Q52 14 11 14 Z' />
    </g>
  </svg>
);
