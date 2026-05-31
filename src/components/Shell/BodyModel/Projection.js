export const project = (x, y, z, rot, scale, center) => {
  const { cx, cy } = center;
  const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);
  const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
  
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  const y1 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  
  const p = 800 / (800 + z2);
  return { x: cx + x1 * scale * p, y: cy + y1 * scale * p, s: p };
};
