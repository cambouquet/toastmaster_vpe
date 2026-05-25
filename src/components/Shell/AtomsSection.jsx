import React from "react";

export const AtomsSection = ({ atoms }) => (
  <div className='card atoms-section'>
    <label>Foundry Primitives</label>
    <div className="atoms-grid">
      {atoms.map((atom) => (
        <div key={atom.name} className="atom-cell">
          <svg viewBox="0 0 80 80" className="atom-svg">
            <path d={atom.path} fill="#00bac4" />
          </svg>
          <div className="atom-meta">{atom.name}</div>
        </div>
      ))}
    </div>
  </div>
);