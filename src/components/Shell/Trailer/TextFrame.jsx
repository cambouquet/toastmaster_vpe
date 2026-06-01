import React from 'react';
import './TextFrame.scss';

export const TextFrame = ({ content, color, effect }) => {
  const renderContent = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (effect === 'impact-center') {
    const parts = content.split('HERO');
    return (
      <div className="text-frame impact-center">
        <h1 className="main-text" style={{ color }}>
          {renderContent(parts[0])}
          <span className="hero-highlight">HERO</span>
          {renderContent(parts[1])}
        </h1>
      </div>
    );
  }

  return (
    <div className={`text-frame ${effect || ''}`}>
      <h1 className="main-text" style={{ color }}>
        {renderContent(content)}
      </h1>
    </div>
  );
};
