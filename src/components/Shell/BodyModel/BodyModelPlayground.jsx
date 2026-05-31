import React, { useRef, useEffect } from 'react';
import { project } from './Projection';
import { getModelNodes } from './ModelGeometry';
import { drawSkeleton } from './SkeletonRenderer';
import { drawEnvironment } from './EnvironmentRenderer';
import { useBodyModelInputs } from './useBodyModelInputs';

export const BodyModelPlayground = () => {
  const canvasRef = useRef(null), rot = useRef({ x: 0.2, y: 0 }), zoom = useRef(0.6);
  const target = useRef({ x: 0, y: 0, z: 0 }), isDragging = useRef(false), lastMouse = useRef({ x: 0, y: 0 });
  useBodyModelInputs(canvasRef, rot, isDragging, lastMouse, zoom, target);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d'); if (!ctx) return;
    const render = (time) => {
      const canvas = canvasRef.current; if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const center = { cx: canvas.width / 2, cy: canvas.height / 2 }, scale = Math.min(canvas.width, canvas.height) * zoom.current;
      drawEnvironment(ctx, rot.current, scale, center, canvas);
      const nodes = getModelNodes(time), projected = {};
      Object.entries(nodes).forEach(([k, pos]) => projected[k] = project(pos[0], pos[1], pos[2], rot.current, scale, center, target.current));
      drawSkeleton(ctx, projected);
      requestAnimationFrame(render);
    };
    const animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }}>
       <div style={{ position: 'absolute', top: 20, left: 20, color: '#00bac4', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', pointerEvents: 'none' }}>
         BIOS // ANATOMY_V4<br/>
         CLICK: ROTATE // SHIFT + CLICK: PAN // WHEEL: ZOOM<br/>
         PRESS 'R' TO RESET VIEW
       </div>
       <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
