import React from 'react';

export const NavGridItem = ({ id, label, status, active, locked, beta, children, onClick }) => (
  <div 
    className={`grid-item ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${!id ? 'placeholder' : ''}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    {beta && <div className="beta-tag">BETA</div>}
    {children}
    <span className="label">{label}</span>
    <span className="status">{status}</span>
  </div>
);