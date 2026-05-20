import React from 'react';
import './Navigation.scss';

export const Navigation = ({ current, onNavigate }) => {
  const items = [
    { id: 'workspace', label: '01_CORE_WORKSPACE' },
    { id: 'members', label: '02_MEMBER_REGISTRY' }
  ];

  return (
    <nav className="cyber-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-btn ${current === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="glitch-text" data-text={item.label}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
