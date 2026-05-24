import React from 'react';

export const NavGridItem = ({ id, label, status, active, locked, children, onClick }) => (
  <div 
    className={`grid-item ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${!id ? 'placeholder' : ''}`}
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    {children}
    <span className="label">{label}</span>
    <span className="status">{status}</span>
  </div>
);