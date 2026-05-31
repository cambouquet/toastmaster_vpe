import React, { useRef } from 'react';
import { useModelRender } from '../BodyModel/useModelRender';

export const Giant3D = ({ className, rotation, z, center, isTrailer, paused }) => {
  const canvasRef = useRef(null), rot = useRef(rotation || { x: 0.2, y: 0.5 });
  const zoom = useRef(z || 0.4), target = useRef(center || { x: 0, y: 0, z: 0 });
  const nodesRef = useRef({}), mousePos = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(null);

  useModelRender(canvasRef, rot, zoom, target, nodesRef, mousePos, false, hoverRef, isTrailer, paused);

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
