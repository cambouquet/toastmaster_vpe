import React, { useState } from "react";
import { PATHWAYS, LVL_REQS } from "../../constants/pathways";
import { DeleteButton } from "../shared/DeleteButton";
export const PathwayNode = ({ item, onUpdate, onRemove, isNew, available }) => {
  const [pick, setPick] = useState(false);
  if (isNew) return (
    <div className={`enrolled-item add-node ${pick ? "picking" : ""}`} onMouseEnter={() => setPick(true)} onMouseLeave={() => setPick(false)}>
      <div className="p-header"><div className={`p-selector ${pick ? "open" : ""}`}><span className="p-name">+ PATHWAY</span>
        {pick && <div className="p-options scroll-hidden">{available.map(p => <div key={p} className="p-opt" onClick={() => { onUpdate(p); setPick(false); }}>{p}</div>)}</div>}
      </div></div>
    </div>
  );
  const up = (u) => onUpdate({ ...item, ...u }), req = LVL_REQS[item.level] || 3;
  const go = (l, p) => p >= (LVL_REQS[l] || 3) && l < 5 ? up({ level: l + 1, projects: 0 }) : up({ level: l, projects: p });
  const back = (l, p) => p < 0 ? (l > 1 ? up({ level: l - 1, projects: (LVL_REQS[l - 1] || 3) - 1 }) : up({ level: 1, projects: 0 })) : up({ level: l, projects: p });

  return (
    <div className={`enrolled-item ${pick ? "picking" : ""}`} onMouseLeave={() => setPick(false)}>
      <div className="p-header">
        <div className={`p-selector ${pick ? "open" : ""}`}>
          <span className="p-name" onClick={() => setPick(!pick)}>{item.name}</span>
          {pick && <div className="p-options scroll-hidden">{PATHWAYS.map(p => <div key={p} className={`p-opt ${p === item.name ? "active" : ""}`} onClick={() => { up({ name: p }); setPick(false); }}>{p}</div>)}</div>}
        </div>
        <DeleteButton onDelete={onRemove} className="p-del-btn" />
      </div>
      <div className="lvl-v2">
        <div className="lvl-line">{[1, 2, 3, 4, 5].map(v => (
          <div key={v} className={`l-pt ${v < item.level ? "m" : v === item.level ? "a" : ""}`} 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (v === item.level + 1 || v === item.level - 1) up({ level: v, projects: 0 }); 
            }}>
            <div className="l-circle"><span>{v}</span></div>
            {v < 5 && <div className="l-link" />}
          </div>
        ))}</div>
        <div className="xp-line">{Array.from({ length: req }).map((_, i) => {
          const count = item.projects || 0;
          return (
            <div key={i} className={`x-pt ${i < count ? "f" : ""}`} 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (i === count) go(item.level, i + 1);
                if (i === count - 1) back(item.level, i);
              }} 
            />
          );
        })}</div>
      </div>
    </div>
  );
};
