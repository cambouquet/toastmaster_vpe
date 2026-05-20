import React from 'react';
import './Subtitles.scss';

export const Subtitles = ({ text }) => {
  return (
    <div className="subtitles-overlay">
      <div className="caption-text">{text}</div>
    </div>
  );
};
