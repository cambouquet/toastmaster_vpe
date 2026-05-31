import { useEffect } from 'react';

export const useBodyModelInputs = (canvasRef, rot, isDragging, lastMouse, zoom, target) => {
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const onDown = (e) => { if (e.button === 0) { isDragging.current = e.shiftKey ? 'pan' : 'rot'; lastMouse.current = { x: e.clientX, y: e.clientY }; } };
    const onMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x, dy = e.clientY - lastMouse.current.y;
      const scale = Math.min(canvas.width, canvas.height) * zoom.current;
      if (isDragging.current === 'rot') { rot.current.y += dx * 0.01; rot.current.x += dy * 0.01; }
      if (isDragging.current === 'pan') { target.current.x -= dx / scale; target.current.y -= dy / scale; }
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e) => { e.preventDefault(); const d = e.ctrlKey ? e.deltaY * 2 : e.deltaY; zoom.current = Math.max(0.1, Math.min(5, zoom.current * (1 - d * 0.002))); };
    const onReset = (e) => { if (e.key === 'r' || e.key === 'R') { rot.current = { x: 0.2, y: 0 }; zoom.current = 0.6; target.current = { x: 0, y: 0, z: 0 }; } };
    const resize = () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; };
    window.addEventListener('resize', resize); window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', () => isDragging.current = false);
    canvas.addEventListener('contextmenu', e => e.preventDefault()); window.addEventListener('keydown', onReset);
    canvas.addEventListener('wheel', onWheel, { passive: false }); resize();
    return () => {
      window.removeEventListener('resize', resize); window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove); window.removeEventListener('keydown', onReset);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [canvasRef, rot, isDragging, lastMouse, zoom, target]);
};
