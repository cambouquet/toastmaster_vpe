import { useEffect } from 'react';
import { handleDown, handleMove, handleWheel } from './InputHandlers';

export const useBodyModelInputs = (canvasRef, rot, isDragging, lastMouse, zoom, target, nodesRef, grabMode) => {
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const onDown = (e) => handleDown(e, canvas, grabMode, zoom, nodesRef, rot, target, isDragging, lastMouse);
    const onMove = (e) => {
      canvas.style.cursor = grabMode ? 'crosshair' : 'default';
      handleMove(e, canvas, isDragging, lastMouse, rot, target, zoom);
    };
    const onWheel = (e) => handleWheel(e, zoom);
    const resize = () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; };
    window.addEventListener('resize', resize); window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', () => isDragging.current = false);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('wheel', onWheel, { passive: false }); resize();
    return () => {
      window.removeEventListener('resize', resize); window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', () => isDragging.current = false);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [grabMode]);
};
