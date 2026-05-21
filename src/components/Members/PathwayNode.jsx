import React, { useState } from 'react';
import { PATHWAYS } from '../../constants/pathways';

export const PathwayNode = ({ item, onUpdate, onRemove, isNew = false, available = [] }) => {
  const [pick, setPick] = useState(false);
  const [conf, setConf] = useState(false);
  
  const handleDel = () => conf ? onRemove() : setConf(true);

  if (isNew) return (
    <div 
      className={`enrolled-item add-node ${pick ? 'open' : ''}`} 
      onMouseEnter={() => setPick(true)}
      onMouseLeave={() => setPick(false)}
    >
      <div className="p-header">
        <div className={`p-selector ${pick ? 'open' : ''}`}>
          <span className="p-name">+ PATHWAY</span>
          {pick && <div className="p-options scroll-hidden">
            {available.map(p => <div key={p} className="p-opt" onClick={() => { onUpdate(p); setPick(false); }}>{p}</div>)}
          </div>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="enrolled-item" onMouseLeave={() => { setPick(false); setConf(false); }}>
      <div className="p-header">
        {conf ? <span className="p-name confirm" onClick={handleDel}>SURE?</span> : (
          <div className={`p-selector ${pick ? 'open' : ''}`}>
            <span className="p-name" onClick={() => setPick(!pick)}>{item.name}</span>
            {pick && <div className="p-options scroll-hidden">
              {PATHWAYS.map(p => <div key={p} className={`p-opt ${p === item.name ? 'active' : ''}`} onClick={() => { onUpdate({ name: p }); setPick(false); }}>{p}</div>)}
            </div>}
          </div>
        )}
        <button className="p-del-btn" onClick={handleDel}><svg viewBox="0 0 24 24" width="12"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2,0,0,0,8,21H16A2,2,0,0,0,18,19V7H6V19Z" /></svg></button>
      </div>
      <div className="lvl-ctrl">{[1, 2, 3, 4, 5].map(v => (
        <div key={v} className={`seg ${v <= item.level ? 'f' : ''}`} onClick={() => onUpdate({ level: v })} />
      ))}</div>
    </div>
  );
};