import { findSelectedSegment } from './SelectionLogic';

export const handleDown = (e, canvas, grabMode, zoom, nodesRef, rot, target, isDragging, lastMouse) => {
  if (e.button !== 0) return;
  if (grabMode) {
    const rect = canvas.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const scale = Math.min(canvas.width, canvas.height) * zoom.current, center = { cx: canvas.width/2, cy: canvas.height/2 };
    const seg = findSelectedSegment(mx, my, nodesRef.current, rot.current, scale, center, target.current);
    if (seg) target.current = { x: seg.x, y: seg.y, z: seg.z };
    return;
  }
  isDragging.current = e.shiftKey ? 'pan' : 'rot';
  lastMouse.current = { x: e.clientX, y: e.clientY };
};

export const handleMove = (e, canvas, isDragging, lastMouse, rot, target, zoom) => {
  if (!isDragging.current) return;
  const dx = e.clientX - lastMouse.current.x, dy = e.clientY - lastMouse.current.y;
  const scale = Math.min(canvas.width, canvas.height) * zoom.current;
  if (isDragging.current === 'rot') { rot.current.y += dx * 0.01; rot.current.x += dy * 0.01; }
  if (isDragging.current === 'pan') {
    const cx = Math.cos(rot.current.x), sx = Math.sin(rot.current.x), cy = Math.cos(rot.current.y), sy = Math.sin(rot.current.y);
    target.current.x += (dx * cy - dy * sx * sy) / scale;
    target.current.y += (dy * cx) / scale;
    target.current.z += (-dx * sy - dy * sx * cy) / scale;
  }
  lastMouse.current = { x: e.clientX, y: e.clientY };
};
export const handleWheel = (e, zoom) => {
  e.preventDefault();
  const d = e.ctrlKey ? e.deltaY * 2 : e.deltaY;
  zoom.current = Math.max(0.1, Math.min(5, zoom.current * (1 - d * 0.002)));
};
