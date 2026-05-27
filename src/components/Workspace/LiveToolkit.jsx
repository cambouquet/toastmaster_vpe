import React from 'react';
import { LiveEval } from './LiveEval';
import { FillerTool } from './FillerTool';
import { TimerTool } from './TimerTool';
import { GramTool } from './GramTool';
import { useMeetingSegments } from '../../hooks/useMeetingSegments';
import { useToolkitTimer } from '../../hooks/useToolkitTimer';
import './LiveToolkit.scss';

export const LiveToolkit = ({ state, onAction }) => {
  const activeIdx = state.activeSegment || 0, roles = state.roles || {};
  const segments = useMeetingSegments(roles), current = segments[activeIdx] || segments[0];
  const format = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const { time, setTime, running, setRunning } = useToolkitTimer(activeIdx, onAction, format);

  const getTarget = () => {
    const l = current.label;
    if (l === 'SPEECH') return '5:00 / 6:00 / 7:00';
    if (l.startsWith('TOPIC')) return '1:00 / 1:30 / 2:00';
    return l === 'EVAL' ? '2:00 / 2:30 / 3:00' : '-- / -- / --';
  };
  const getLight = () => {
    const t = time, l = current.label;
    if (l === 'SPEECH') return t >= 420 ? 'red' : t >= 360 ? 'yellow' : t >= 300 ? 'green' : '';
    if (l.startsWith('TOPIC')) return t >= 120 ? 'red' : t >= 90 ? 'yellow' : t >= 60 ? 'green' : '';
    return l === 'EVAL' ? (t >= 180 ? 'red' : t >= 150 ? 'yellow' : t >= 120 ? 'green' : '') : '';
  };

  return (
    <div className={`card live-toolkit ${running ? 'pulse-border' : ''} light-${getLight()}`}>
      <div className="session-header">
        <span className="session-label">{running ? 'LISTEN MODE ACTIVE' : 'LOG'}</span>
        <span className="session-member">{current.member}</span>
      </div>
      <div className="tool-grid">
        <FillerTool activeIdx={activeIdx} state={state} onAction={onAction} />
        <TimerTool activeIdx={activeIdx} time={time} setTime={setTime} running={running} setRunning={setRunning} getTarget={getTarget} format={format} state={state} onAction={onAction} />
        <GramTool activeIdx={activeIdx} state={state} onAction={onAction} />
      </div>
      <div className={`eval-vessel ${running ? 'locked' : 'ready'}`}>
        <LiveEval activeIdx={activeIdx} state={state} onAction={onAction} />
      </div>
    </div>
  );
};

