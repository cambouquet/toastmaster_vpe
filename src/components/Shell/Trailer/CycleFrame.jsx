import React from 'react';
const Entity = ({ cls, path, core, delay, dx, dy, rot }) => (
  <g className={`life-entity ${cls}`} style={{ animationDelay: delay, '--dx': dx, '--dy': dy, '--rot': rot }}>
    {path}
    {core}
  </g>
);
export const CycleFrame = ({ paused }) => (
  <div className={`cycle-frame ${paused ? 'is-paused' : ''}`}>
    <div className="giant-being">
      <div className="being-aura" /><div className="being-inner-light" /><div className="held-light" />
      <div className="life-spawn-point">
        <svg viewBox="0 0 400 400" className="life-entities-svg">
          <Entity cls="bird" dx="-200px" dy="-400px" rot="-30deg" delay="6.5s" 
            path={<path d="M0,0 Q15,-15 30,0 T60,0" fill="none" stroke="white" strokeWidth="2" className="wing-anim" />}
            core={<circle cx="30" cy="0" r="3" fill="white" className="entity-core-glow" />} 
          />
          <Entity cls="bird-2" dx="250px" dy="-350px" rot="35deg" delay="7.2s" 
            path={<path d="M0,5 Q10,-10 20,5 T40,5" fill="none" stroke="#00bac4" strokeWidth="1.5" className="wing-anim-delayed" />}
            core={<circle cx="20" cy="5" r="2" fill="#00bac4" className="entity-core-glow" />} 
          />
          <Entity cls="spirit" dx="40px" dy="-450px" rot="10deg" delay="8.0s"
            path={<path d="M0,0 Q-10,20 0,40" stroke="#fcee0a" fill="none" opacity="0.6" strokeWidth="2" />}
            core={<circle cx="0" cy="0" r="4" fill="#fcee0a"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" /></circle>}
          />
        </svg>
      </div>
    </div>
  </div>
);
