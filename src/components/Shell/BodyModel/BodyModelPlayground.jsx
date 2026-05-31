import React, { useRef, useEffect } from 'react';
import { useBodyModelInputs } from './useBodyModelInputs';
import { useModelRender } from './useModelRender';
import { ModelHUD, ModelVignette } from './ModelUI';

export const BodyModelPlayground = () => {
  const canvasRef = useRef(null), rot = useRef({ x: 0.2, y: 0 }), zoom = useRef(0.6);
  const target = useRef({ x: 0, y: 0, z: 0 }), isDragging = useRef(false), lastMouse = useRef({ x: 0, y: 0 });
  const nodesRef = useRef({}), mousePos = useRef({ x: 0, y: 0 }), hoverRef = useRef(null);
  const [grabMode, setGrabMode] = React.useState(false), [lastK, setLastK] = React.useState('NONE');

  useBodyModelInputs(canvasRef, rot, isDragging, lastMouse, zoom, target, nodesRef, grabMode);
  useModelRender(canvasRef, rot, zoom, target, nodesRef, mousePos, grabMode, hoverRef);

  useEffect(() => {
    const onMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect(); 
      if (rect) mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onK = (e) => { 
      const k = e.key.toLowerCase();
      setLastK(k.toUpperCase());
      if (k === 'g') setGrabMode(p => !p); 
      if (k === 'r') {
        rot.current = { x: 0.2, y: 0 }; zoom.current = 0.6;
        target.current = { x: 0, y: 0, z: 0 };
      }
    };
    window.addEventListener('mousemove', onMove); window.addEventListener('keydown', onK, true);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('keydown', onK, true); };
  }, [grabMode]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', position: 'relative', overflow: 'hidden', cursor: grabMode ? 'crosshair' : 'default' }}>
       <ModelVignette grabMode={grabMode} />
       <ModelHUD grabMode={grabMode} lastK={lastK} />
       <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
