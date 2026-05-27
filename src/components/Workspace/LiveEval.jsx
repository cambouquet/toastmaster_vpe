import React from 'react';

const EvalRow = ({ label, f, state, onUp }) => {
  const d = state[f] || {}, v = d.v || 0;
  const up = (k, val) => onUp(f, { ...d, [k]: val });
  return (
    <div className="e-row">
      <input className="e-i i-l" placeholder="..." value={d.ni || ''} onChange={e => up('ni', e.target.value)} />
      <button className={`b-m ${v === -1 ? 'a' : ''}`} onClick={() => up('v', v === -1 ? 0 : -1)}>-</button>
      <span className="e-t">{label}</span>
      <button className={`b-p ${v === 1 ? 'a' : ''}`} onClick={() => up('v', v === 1 ? 0 : 1)}>+</button>
      <input className="e-i i-r" placeholder="..." value={d.nw || ''} onChange={e => up('nw', e.target.value)} />
    </div>
  );
};

export const LiveEval = ({ activeIdx, state, onAction }) => {
  const ek = `eval-${activeIdx}`, data = state[ek] || {};
  const up = (f, v) => onAction(ek, { ...data, [f]: v });
  const groups = [
    { n: 'MATERIAL', f: [['Purpose', 'p'], ['Structure', 's'], ['Content', 'c']] },
    { n: 'DELIVERY', f: [['Voice', 'v'], ['Body', 'g'], ['Confidence', 'f']] },
    { n: 'AUDIENCE', f: [['Language', 'l'], ['Connection', 'a'], ['Impact', 'i']] }
  ];

  return (
    <div className="post-eval">
      {groups.map(g => (
        <div key={g.n} className="e-g">
          <label className="g-l">{g.n}</label>
          {g.f.map(([l, f]) => <EvalRow key={f} label={l} f={f} state={data} onUp={up} />)}
        </div>
      ))}
      <textarea className="e-sum" placeholder="Overall synthesis..." value={data.notes || ''} onChange={e => up('notes', e.target.value)} />
    </div>
  );
};
