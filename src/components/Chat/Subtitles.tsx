import React from 'react';
import './Subtitles.scss';

export const Subtitles: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="subtitles-overlay">
      <div className="caption-text">{text}</div>
    </div>
  );
};
