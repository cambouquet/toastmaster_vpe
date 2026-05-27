import React, { useState, useEffect } from 'react';
import { LiveEval } from './LiveEval';
import { FillerTool } from './FillerTool';
import { TimerTool } from './TimerTool';
import { GramTool } from './GramTool';
import { useMeetingSegments } from '../../hooks/useMeetingSegments';
import { useToolkitTimer } from '../../hooks/useToolkitTimer';
import './LiveToolkit.scss';

export const LiveToolkit = ({ state, onAction }) => {
  const [localIdx, setLocalIdx] = useState(state.activeSegment || 0);
  useEffect(() => setLocalIdx(state.activeSegment || 0), [state.activeSegment]);
  const activeIdx = localIdx, roles = state.roles || {}, segments = useMeetingSegments(roles);
  const current = segments[activeIdx] || segments[0], isGlobal = activeIdx === (state.activeSegment || 0);
  const format = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const { time, setTime, running, setRunning: rawSR } = useToolkitTimer(state.activeSegment || 0, onAction, format);
  const setRunning = (v) => { onAction(v ? 'TIMER_START' : 'TIMER_STOP', current.member); rawSR(v); };
  const getTarget = () => current.label === 'SPEECH' ? '5:00/6:00/7:00' : current.label === 'EVAL' ? '2:00/2:30/3:00' : '1:00/1:30/2:00';
  const getLight = () => {
    const t = time, l = current.label, th = l === 'EVAL' ? [120, 150, 180] : [60, 90, 120];
    if (l === 'SPEECH') return t >= 420 ? 'red' : t >= 360 ? 'yellow' : t >= 300 ? 'green' : '';
    return t >= th[2] ? 'red' : t >= th[1] ? 'yellow' : t >= th[0] ? 'green' : '';
  };
  return (
    <div className={`card live-toolkit ${running && isGlobal ? 'pulse-border' : ''} light-${isGlobal ? getLight() : ''}`}>
      <div className="session-header"><div className="session-nav">
          <div className="nav-group"><button className="nav-btn" onClick={() => setLocalIdx(Math.max(0, localIdx-1))}>‹</button>
            <button className="nav-btn" onClick={() => setLocalIdx(Math.min(segments.length-1, localIdx+1))}>›</button></div>
          <span className="session-label">{current.member}</span>
          <span className="session-status">{running && isGlobal ? 'LISTENING' : 'IDLE'}</span></div>
        <div className="session-member-group"><span className="session-member">{current.label}</span>
          {current.title && <span className="session-title">{current.title}</span>}</div></div>
      <div className="tool-grid">
        <FillerTool activeIdx={activeIdx} state={state} onAction={onAction} />
        <TimerTool activeIdx={activeIdx} time={isGlobal ? time : 0} setTime={setTime} running={isGlobal && running} 
          setRunning={setRunning} getTarget={getTarget} format={format} state={state} onAction={onAction} />
        <GramTool activeIdx={activeIdx} state={state} onAction={onAction} />
      </div><div className={`eval-vessel ${running && isGlobal ? 'locked' : 'ready'}`}><LiveEval activeIdx={activeIdx} state={state} onAction={onAction} /></div>
    </div>
  );
};






