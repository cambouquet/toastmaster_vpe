export const project = (x, y, z, rot, scale, center, target = { x: 0, y: 0, z: 0 }) => {
  const { cx, cy } = center;
  const cosY = Math.cos(rot.y), sinY = Math.sin(rot.y);
  const cosX = Math.cos(rot.x), sinX = Math.sin(rot.x);
  
  const tx = x - target.x, ty = y - target.y, tz = z - target.z;
  const x1 = tx * cosY - tz * sinY;
  const z1 = tz * cosY + tx * sinY;
  const y1 = ty * cosX - z1 * sinX;
  const z2 = z1 * cosX + ty * sinX;
  
  const p = 800 / (800 + z2);
  return { x: cx + x1 * scale * p, y: cy + y1 * scale * p, s: p };
};
