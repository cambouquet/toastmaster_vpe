import { useEffect } from 'react';

export const useBodyModelInputs = (canvasRef, rot, isDragging, lastMouse) => {
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const resize = () => { canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight; };
    const onDown = (e) => { isDragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
    const onMove = (e) => {
      if (!isDragging.current) return;
      rot.current.y += (e.clientX - lastMouse.current.x) * 0.01;
      rot.current.x += (e.clientY - lastMouse.current.y) * 0.01;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => isDragging.current = false;
    window.addEventListener('resize', resize); window.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    resize();
    return () => {
      window.removeEventListener('resize', resize); window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
    };
  }, [canvasRef, rot, isDragging, lastMouse]);
};
