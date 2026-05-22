import React, { useState, useEffect } from 'react';
import './Subtitles.scss';

export const Subtitles = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (text && text !== 'Standby.') {
      setContent(text);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [text]);

  return (
    <div className={`subtitles-overlay ${visible ? 'visible' : 'hidden'}`}>
      <div className="caption-text">{content}</div>
    </div>
  );
};
