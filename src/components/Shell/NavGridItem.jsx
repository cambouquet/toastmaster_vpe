import React from 'react';
import { KFontText } from './KFontText';

export const NavGridItem = ({ id, label, status, active, locked, beta, children, onClick }) => {
  const getAppColor = () => {
    if (id === 'font-lab' || id === 'id-lab') return '#ff0044';
    return '#00bac4';
  };

  return (
    <div 
      className={`grid-item ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${!id ? 'placeholder' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
    {beta && <div className="beta-tag">BETA</div>}
    {children}
    <div className="label-wrap" style={{ marginBottom: 4 }}>
      <KFontText 
        text={label} 
        height={12} 
        color={id === 'toastmaster' ? '#00bac4' : '#ffffff'} 
        firstLetterColor="#ff0044"
      />
    </div>
    <span className="status">{status}</span>
  </div>
  );
};