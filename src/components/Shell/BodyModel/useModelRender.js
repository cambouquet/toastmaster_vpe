import { useEffect, useRef } from 'react';
import { project } from './Projection';
import { getModelNodes } from './ModelGeometry';
import { drawSkeleton } from './SkeletonRenderer';
import { drawEnvironment } from './EnvironmentRenderer';
import { findSelectedSegment } from './SelectionLogic';

export const useModelRender = (canvasRef, rot, zoom, target, nodesRef, mousePos, grabMode, hoverRef, isTrailer, paused) => {
  const timeRef = useRef(0), lastRef = useRef(0);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d'); if (!ctx) return;
    const render = (now) => {
      const delta = lastRef.current ? now - lastRef.current : 0; lastRef.current = now;
      if (!paused) timeRef.current += delta;
      const canvas = canvasRef.current; if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width, canvas.height) * zoom.current, center = { cx: canvas.width / 2, cy: canvas.height / 2 };
      drawEnvironment(ctx, rot.current, scale, center, canvas, target.current);
      const nodes = getModelNodes(isTrailer ? timeRef.current + 2000000 : timeRef.current); nodesRef.current = nodes;
      const hover = findSelectedSegment(mousePos.current.x, mousePos.current.y, nodes, rot.current, scale, center, target.current);
      hoverRef.current = grabMode ? hover : null;
      const proj = {}; Object.entries(nodes).forEach(([k, p]) => proj[k] = project(p[0], p[1], p[2], rot.current, scale, center, target.current));
      drawSkeleton(ctx, proj, hoverRef.current);
      if (grabMode && hover) {
        const hp = project(hover.x, hover.y, hover.z, rot.current, scale, center, target.current);
        ctx.strokeStyle = '#f0f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hp.x, hp.y, 18, 0, 7); ctx.stroke();
      }
      requestAnimationFrame(render);
    };
    const animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [grabMode, canvasRef, rot, zoom, target, nodesRef, mousePos, hoverRef, paused, isTrailer]);
};
