import React from 'react';
import './LiveToolkit.scss';

export const LiveToolkit = ({ state, onAction }) => {
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const ahCount = state.ahCount || 0;

  React.useEffect(() => {
    let interval;
    if (running) interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const format = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const getColor = () => {
    if (time >= 420) return '#ff4444';
    if (time >= 360) return '#ffbb33';
    if (time >= 300) return '#00C851';
    return '#00bac4';
  };

  return (
    <div className="card live-toolkit">
      <label>LIVE TOOLKIT</label>
      <div className="tool-grid">
        <div className="tool-item">
          <span className="tool-label">AH-COUNTER</span>
          <div className="counter-controls">
            <button onClick={() => onAction('ahCount', Math.max(0, ahCount - 1))}>-</button>
            <span className="count-val">{ahCount}</span>
            <button onClick={() => onAction('ahCount', ahCount + 1)}>+</button>
          </div>
        </div>
        <div className="tool-item">
          <span className="tool-label">TIMER CONTROL</span>
          <div className="timer-display" style={{ color: getColor() }}>{format(time)}</div>
          <div className="timer-btns">
            <button className={running ? 'pause' : 'start'} onClick={() => setRunning(!running)}>
              {running ? 'PAUSE' : 'START'}
            </button>
            <button className="reset" onClick={() => { setTime(0); setRunning(false); }}>RESET</button>
          </div>
        </div>
      </div>
    </div>
  );
};
