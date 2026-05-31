import { project } from './Projection';

export const drawEnvironment = (ctx, rot, scale, center, canvas) => {
  ctx.strokeStyle = 'rgba(0, 186, 196, 0.1)'; ctx.lineWidth = 1;
  for (let i = -5; i <= 5; i++) {
    const p1 = project(i * 0.4, 0.8, -2, rot, scale, center);
    const p2 = project(i * 0.4, 0.8, 2, rot, scale, center);
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    const p3 = project(-2, 0.8, i * 0.4, rot, scale, center);
    const p4 = project(2, 0.8, i * 0.4, rot, scale, center);
    ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
  }
  ctx.fillStyle = 'rgba(0, 186, 196, 0.5)'; ctx.font = '9px monospace';
  ctx.fillText(`ROT_X: ${rot.x.toFixed(2)}`, 20, canvas.height - 25);
  ctx.fillText(`ROT_Y: ${rot.y.toFixed(2)}`, 20, canvas.height - 10);
};
