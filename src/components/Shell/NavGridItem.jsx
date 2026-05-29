import React from 'react';
import { KFontText } from './KFontText';
import { getAppInfo } from '../../services/system/AppRegistry.jsx';

export const NavGridItem = ({ id, label, status, active, locked, beta, children, onClick }) => {
  const app = getAppInfo(id);
  const color = id ? app.color : '#ffffff';

  return (
    <div className={`grid-item ${active ? 'active' : ''} ${locked ? 'locked' : ''} ${!id ? 'placeholder' : ''}`}
      onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {id && <div className="bg-glitch" />}
      {beta && <div className="beta-tag">BETA</div>}
      {children}
      <div className="label-wrap" style={{ marginBottom: 4 }}>
        <KFontText text={label} height={16} color={color} firstLetterColor="#ff0044" />
      </div>
      <span className="status">{status}</span>
    </div>
  );
};