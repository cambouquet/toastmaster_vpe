import { project } from './Projection';

export const drawEnvironment = (ctx, rot, scale, center, canvas, target = {x:0,y:0,z:0}) => {
  ctx.strokeStyle = 'rgba(0, 186, 196, 0.15)'; ctx.lineWidth = 1;
  // Dynamic ground grid centered on floor level
  for (let i = -10; i <= 10; i++) {
    const p1 = project(i * 0.2, 0.9, -2, rot, scale, center, target);
    const p2 = project(i * 0.2, 0.9, 2, rot, scale, center, target);
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
    const p3 = project(-2, 0.9, i * 0.2, rot, scale, center, target);
    const p4 = project(2, 0.9, i * 0.2, rot, scale, center, target);
    ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
  }
  // Vertical perspective lines (horizon references)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  [ -1.5, 1.5 ].forEach(x => {
     const v1 = project(x, -2, 0, rot, scale, center, target);
     const v2 = project(x, 2, 0, rot, scale, center, target);
     ctx.beginPath(); ctx.moveTo(v1.x, v1.y); ctx.lineTo(v2.x, v2.y); ctx.stroke();
  });
  ctx.fillStyle = 'rgba(0, 186, 196, 0.5)'; ctx.font = '9px monospace';
  ctx.fillText(`TARGET: ${target.x.toFixed(2)},${target.y.toFixed(2)},${target.z.toFixed(2)}`, 20, canvas.height - 25);
  ctx.fillText(`YRAYS: SCANNING_ACTIVE`, 20, canvas.height - 10);
};
