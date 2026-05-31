import React from 'react';

export const ModelHUD = ({ grabMode, lastK }) => (
  <div style={{ position: 'absolute', top: 20, left: 20, color: '#00bac4', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', pointerEvents: 'none' }}>
    BIOS // ANATOMY_V4 [{lastK}]<br/>
    CLICK: ROTATE // SHIFT+CLICK: PAN // WHEEL: ZOOM<br/>
    'G': <span style={{ color: grabMode ? '#f0f' : '#00bac4' }}>{grabMode ? 'FOCUS_MODE: ACTIVE' : 'TOGGLE FOCUS MODE'}</span>
  </div>
);

export const ModelVignette = ({ grabMode }) => (
  grabMode && <div style={{ position: 'absolute', inset: 0, border: '2px solid #f0f3', pointerEvents: 'none', boxShadow: 'inset 0 0 40px #f0f1' }} />
);
