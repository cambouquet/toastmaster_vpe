import React, { useRef, useEffect } from 'react';

export const MapPreview = ({ url }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // If it's a normal Google Maps link, try to convert it to an embed link if possible
    // For now, let's just try to render it if it's embeddable or if it's a full URL
  }, [url]);

  if (!url) return null;

  // Simple heuristic for embedded google maps or open street map
  // If user provides a normal link, we could try to switch it but it's tricky without a proxy/API
  // For the tactical feel, we'll use a stylized iframe or a placeholder if it fails
  
  return (
    <div className="map-container card">
      <label>SATELLITE DOWNLINK</label>
      <div className="map-frame">
        <iframe 
          title="Satellite Map"
          src={url.includes('google.com/maps/embed') ? url : `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(url)}`}
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
          allowFullScreen="" 
          loading="lazy"
        />
        <div className="map-overlay">
          <div className="scanner-line"></div>
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
      </div>
    </div>
  );
};
