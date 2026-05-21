import React, { useState } from 'react';
import { PATHWAYS, LVL_REQS } from '../../constants/pathways';

const Lvl = ({ n, cur, projs, onUp }) => {
  const isA = n === cur, isM = n < cur, req = LVL_REQS[n] || 3;
  return (
    <div className={`lvl-sq ${isM ? 'm' : isA ? 'a' : ''}`} onClick={() => onUp({ level: n, projects: 0 })}>
      {isA ? (
        <div className="xp-g" style={{ gridTemplateColumns: `repeat(${req === 4 ? 2 : 3}, 1fr)` }}>
          {Array.from({ length: req }).map((_, i) => (
            <div key={i} className={`xp-p ${i < projs ? 'f' : ''}`} onClick={e => { 
              e.stopPropagation(); 
              onUp({ projects: projs === i + 1 ? i : i + 1 }); 
            }} />
          ))}
        </div>
      ) : <span>{n}</span>}
    </div>
  );
};

export const PathwayNode = ({ item, onUpdate, onRemove, isNew, available }) => {
  const [pick, setPick] = useState(false), [conf, setConf] = useState(false);
  if (isNew) return (
    <div className="enrolled-item add-node" onMouseEnter={() => setPick(true)} onMouseLeave={() => setPick(false)}>
      <div className="p-header"><div className="p-selector"><span className="p-name">+ PATHWAY</span>
      {pick && <div className="p-options scroll-hidden">{available.map(p => <div key={p} className="p-opt" onClick={() => { onUpdate(p); setPick(false); }}>{p}</div>)}</div>}
      </div></div>
    </div>
  );
  return (
    <div className="enrolled-item" onMouseLeave={() => { setPick(false); setConf(false); }}>
      <div className="p-header">
        {conf ? <span className="p-name confirm" onClick={() => onRemove()}>SURE?</span> : 
        <div className="p-selector"><span className="p-name" onClick={() => setPick(!pick)}>{item.name}</span>
        {pick && <div className="p-options scroll-hidden">{PATHWAYS.map(p => <div key={p} className={`p-opt ${p === item.name ? 'active' : ''}`} onClick={() => { onUpdate({ name: p }); setPick(false); }}>{p}</div>)}</div>}
        </div>}
        <button className="p-del-btn" onClick={() => setConf(true)}><svg viewBox="0 0 24 24" width="12"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2,0,0,0,8,21H16A2,2,0,0,0,18,19V7H6V19Z" /></svg></button>
      </div>
      <div className="lvl-ctrl">{[1, 2, 3, 4, 5].map(v => <Lvl key={v} n={v} cur={item.level} projs={item.projects || 0} onUp={onUpdate} />)}</div>
    </div>
  );
};