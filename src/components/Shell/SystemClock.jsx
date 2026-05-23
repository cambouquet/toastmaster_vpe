import React, { useState, useEffect } from 'react';
import './SystemClock.scss';

export const SystemClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const dStr = now.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  
  // Progress calculations
  const sProgress = (now.getSeconds() * 62.8) / 60;
  const mProgress = (now.getMinutes() * 62.8) / 60;
  const hProgress = (now.getHours() * 62.8) / 24;
  
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dProgress = (now.getDate() * 62.8) / daysInMonth;
  const moProgress = ((now.getMonth() + 1) * 62.8) / 12;

  const Gauge = ({ progress, tip }) => (
    <div className="clock-visual">
      <svg viewBox="0 0 24 24" className="spinner">
         <circle cx="12" cy="12" r="10" stroke="rgba(0,186,196,0.15)" fill="none" strokeWidth="2" />
         <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2" 
           strokeDasharray="62.8" strokeDashoffset={62.8 - progress} />
      </svg>
      <div className="clock-tooltip">{tip}</div>
    </div>
  );

  return (
    <div className="system-clock">
      <Gauge progress={sProgress} tip={`SEC: ${now.getSeconds()}`} />
      <Gauge progress={mProgress} tip={`MIN: ${now.getMinutes()}`} />
      <Gauge progress={hProgress} tip={`HR: ${now.getHours()}`} />
      <Gauge progress={dProgress} tip={`DAY: ${now.getDate()}`} />
      <Gauge progress={moProgress} tip={`MO: ${now.getMonth() + 1}`} />
    </div>
  );
};
