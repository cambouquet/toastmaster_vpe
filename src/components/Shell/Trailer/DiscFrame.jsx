import React from 'react';
const HandSVG = () => (
  <svg viewBox="0 0 200 400" className="hand-svg">
    <defs>
      <linearGradient id="hand-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#00bac4', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#00bac4', stopOpacity: 0.4 }} />
      </linearGradient>
      <filter id="hand-glow"><feGaussianBlur stdDeviation="3" /><feComposite in="SourceGraphic" operator="over" /></filter>
    </defs>
    <path d="M100,400 C90,350 70,330 60,250 C55,200 40,150 45,100 C48,70 60,40 75,30 C85,25 95,50 95,100 C98,60 110,30 120,40 C135,55 125,120 120,170 C115,220 110,300 100,400" fill="url(#hand-gradient)" filter="url(#hand-glow)" className="ethereal-hand hand-palm" />
    <g className="fingers" stroke="url(#hand-gradient)" fill="none" strokeWidth="4" strokeLinecap="round">
      <path d="M75,100 Q70,20 85,15" className="finger index" />
      <path d="M95,100 Q105,10 115,20" className="finger middle" />
      <path d="M115,120 Q125,30 135,45" strokeWidth="3" className="finger ring" />
      <path d="M60,250 Q20,200 30,150" strokeWidth="5" className="finger thumb" />
    </g>
  </svg>
);
export const DiscFrame = ({ type }) => (
  <div className="disc-frame">
    <div className="star-field" />
    <div className="light-disc" />
    {type === "grab" && <div className="grabbing-hand-container"><HandSVG /></div>}
  </div>
);
