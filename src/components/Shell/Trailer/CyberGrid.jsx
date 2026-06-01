import React, { useMemo } from 'react';
import './CyberGrid.scss';

export const CyberGrid = () => {
  const roadCount = 12;
  const buildingsPerRoad = 12;
  
  const { buildings, clouds } = useMemo(() => {
    const bList = [];
    const cList = [];

    // Roads and buildings
    for (let r = 0; r < roadCount; r++) {
      const angle = (r * 360) / roadCount;
      const rad = (angle * Math.PI) / 180;
      for (let b = 0; b < buildingsPerRoad; b++) {
        const distance = 300 + b * 400 + (Math.random() * 50);
        const sideOffset = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 40);
        const x = Math.cos(rad) * distance + Math.cos(rad + Math.PI/2) * sideOffset;
        const z = Math.sin(rad) * distance + Math.sin(rad + Math.PI/2) * sideOffset;
        bList.push({
          id: `road-${r}-${b}`, x: `${x}px`, z: `${z}px`,
          h: `${200 + Math.random() * 600}px`, w: `${60 + Math.random() * 40}px`,
          delay: b * 0.15 + r * 0.05
        });
      }
    }

    // Clouds (Floating above the city)
    for (let i = 0; i < 20; i++) {
      cList.push({
        id: `cloud-${i}`,
        x: `${(Math.random() - 0.5) * 6000}px`,
        y: `${-1000 - Math.random() * 1000}px`,
        z: `${(Math.random() - 0.5) * 6000}px`,
        scale: 1 + Math.random() * 3,
        duration: 30 + Math.random() * 60,
        delay: Math.random() * -60
      });
    }

    return { buildings: bList, clouds: cList };
  }, []);

  return (
    <div className="cyber-grid-container">
      <div className="v-world">
        <div className="sky-atmosphere" />
        <div className="cloud-layer">
          {clouds.map(c => (
            <div 
              key={c.id} className="volume-cloud" 
              style={{ 
                '--x': c.x, '--y': c.y, '--z': c.z, 
                '--s': c.scale, '--dur': `${c.duration}s`, '--del': `${c.delay}s` 
              }} 
            />
          ))}
        </div>
        <div className="grass-field" />
        <div className="road-network">
          {[...Array(roadCount)].map((_, i) => (
            <div key={i} className="road-line" style={{ '--i': i, '--angle': `${i * (360/roadCount)}deg` }} />
          ))}
        </div>
        <div className="f-grid" />
        <div className="city-scape">
          {buildings.map((b) => (
            <div 
              key={b.id} className="cube-building" 
              style={{ '--x': b.x, '--z': b.z, '--h': b.h, '--w': b.w, '--delay': `${b.delay}s` }}
            >
              <div className="face f" /><div className="face r" /><div className="face b" /><div className="face l" /><div className="face t" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
