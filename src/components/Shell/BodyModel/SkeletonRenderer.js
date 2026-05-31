import { getAllLinks } from './ModelTopology';
import { drawLink, drawDot } from './RenderUtils';

export const drawSkeleton = (ctx, p, hover) => {
  if (p.apple) {
    const s = 15 * p.apple.s;
    ctx.fillStyle = '#f33'; ctx.beginPath(); ctx.arc(p.apple.x, p.apple.y, s, 0, 7); ctx.fill();
    ctx.strokeStyle = '#2a2'; ctx.lineWidth = 2 * p.apple.s;
    ctx.beginPath(); ctx.moveTo(p.apple.x, p.apple.y - s); ctx.lineTo(p.apple.x + 2, p.apple.y - s - 5); ctx.stroke();
  }
  getAllLinks().forEach(([a, b]) => {
    drawLink(ctx, p, a, b, hover, '#00bac4', 1.5);
  });
  const hd = ['m1','m2','m3','hFL','hFR','hKL','hKR','hJF','hJL','hJR'];
  ['lE', 'rE', ...hd, 'neck', 'spine', 'lS', 'rS', 'lEl', 'rEl', 'lH', 'rH'].forEach(n => drawDot(ctx, p, n));
  ['l','r'].forEach(s => {
    ['T','I','M','R','P'].forEach(f => {
      const dots = f === 'T' ? [`${s}${f}0`, `${s}${f}1`, `${s}${f}2`, `${s}${f}3`] : [`${s}${f}0`, `${s}${f}05`, `${s}${f}1`, `${s}${f}2`, `${s}${f}3`, `${s}${f}4`];
      dots.forEach(n => drawDot(ctx, p, n, '#fff', 2));
    });
  });
  ['lHip', 'rHip', 'lK', 'rK', 'lF', 'rF'].forEach(n => drawDot(ctx, p, n));
};
