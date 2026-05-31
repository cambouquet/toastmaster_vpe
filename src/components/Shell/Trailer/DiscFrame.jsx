import React from 'react';
import './DiscFrame.scss';

export const DiscFrame = ({ type, paused, extraClass = "" }) => (
  <div className={`disc-frame ${type} ${paused ? 'paused' : ''} ${extraClass}`}>
    <div className="sun-core" />
    <div className="rainbow-halo" />
    <div className="atmospheric-glow" />
  </div>
);
