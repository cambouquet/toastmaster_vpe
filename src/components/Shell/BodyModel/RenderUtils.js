export const drawLink = (ctx, p, a, b, hover, col = '#00bac4', w = 2) => {
  if (!p[a] || !p[b]) return;
  let isH = false;
  if (hover) {
    const mx = (p[a].x + p[b].x)/2, my = (p[a].y + p[b].y)/2;
    const hpx = (hover.p1.x + hover.p2.x)/2, hpy = (hover.p1.y + hover.p2.y)/2;
    if (Math.hypot(mx-hpx, my-hpy) < 1) isH = true;
  }
  const op = Math.max(0.1, p[a].s);
  ctx.strokeStyle = isH ? '#f0f' : col; ctx.globalAlpha = op;
  ctx.lineWidth = (isH ? w * 2 : w) * p[a].s;
  ctx.beginPath(); ctx.moveTo(p[a].x, p[a].y); ctx.lineTo(p[b].x, p[b].y); ctx.stroke();
  ctx.globalAlpha = 1;
};

export const drawDot = (ctx, p, n, c = '#fff', r = 2.5) => {
  if (!p[n]) return;
  ctx.fillStyle = c; ctx.globalAlpha = Math.max(0.2, p[n].s);
  ctx.beginPath(); ctx.arc(p[n].x, p[n].y, r * p[n].s, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
};
