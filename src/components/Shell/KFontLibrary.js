const T = "M8 76 L11 4 L14 76 Z"; // Tower
const S1 = "M14 4 Q60 4 65 35 L55 35 Q50 14 14 14 Z"; // Upper Sail
const S2 = "M14 76 Q60 76 65 45 L55 45 Q50 66 14 66 Z"; // Lower Sail
const KT_U = "M18 32 Q50 4 75 18 L28 42 Z"; // Wing (Upper)
const KATANA = (x, y, s=1) => `M${x-8*s} ${y-8*s} L${x+3*s} ${y+3*s} L${x} ${y+6*s} L${x-11*s} ${y-5*s} Z M${x} ${y} Q${x+32*s} ${y+18*s} ${x+58*s} ${y+28*s} L${x+50*s} ${y+28*s} Q${x+26*s} ${y+18*s} ${x} ${y+4*s} Z`; // Handle + Blade
const SW = (y, w=55) => `M11 ${y+1} L16 ${y+1} L16 ${y+7} L11 ${y+7} Z M18 ${y} L${w} ${y} L${w+5} ${y+4} L${w} ${y+8} L18 ${y+8} Z`; // Single Light Saber
const LS = (y, w=65, mid=32) => `M${mid-3} ${y+1} L${mid+3} ${y+1} L${mid+3} ${y+7} L${mid-3} ${y+7} Z M${mid+5} ${y} L${w-5} ${y} L${w} ${y+4} L${w-5} ${y+8} L${mid+5} ${y+8} Z M${mid-5} ${y} L5 ${y} L0 ${y+4} L5 ${y+8} L${mid-5} ${y+8} Z`; // Dual-Blade Light Stick

const AU = "M8 22 Q40 -10 72 22 L72 32 Q40 0 8 32 Z"; // Round Top
const AD = "M8 58 Q40 90 72 58 L72 48 Q40 80 8 48 Z"; // Round Bot
const AL = (y1=20, y2=60) => `M22 ${y1} Q-10 40 22 ${y2} L32 ${y2} Q0 40 32 ${y1} Z`; // Round Left
const AR = (y1=20, y2=60) => `M58 ${y1} Q90 40 58 ${y2} L48 ${y2} Q80 40 48 ${y1} Z`; // Round Right
const POLE = (x, y1=4, y2=76) => `M${x} ${y1} L${x+3} ${y2} L${x+6} ${y1} Z`; // Vertical element
const LANCE = (bx, by, tx, ty, w=10) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const ux = dx/len;
  const uy = dy/len;
  const vx = -uy;
  const vy = ux;
  const hlen = 15; // length of head
  const hx = tx - ux * hlen;
  const hy = ty - uy * hlen;
  return `M${bx-vx*w/2} ${by-vy*w/2} L${hx-vx*w/2} ${hy-vy*w/2} L${hx-vx*w} ${hy-vy*w} L${tx} ${ty} L${hx+vx*w} ${hy+vy*w} L${hx+vx*w/2} ${hy+vy*w/2} L${bx+vx*w/2} ${by+vy*w/2} Z`;
}; // Rotational Vector Lance with Arrowhead
const POINT = (x, y, w=10, h=16) => `M${x} ${y} L${x+w/2} ${y+h} L${x} ${y+h*0.7} L${x-w/2} ${y+h} Z`; // Forged Weapon Tip (Pointe)
const BIRD_WING = (bx, by, tx, ty, side=1) => {
  const cx = bx + (tx-bx)*0.4 - side*12; 
  const cy = by + (ty-by)*0.5;
  return `M${bx} ${by} Q${cx} ${cy} ${tx} ${ty} Q${cx+side*6} ${cy} ${bx+side*10} ${by} Z`;
}; // Bird Wing (Scythe silhouette)
const ANGEL_WING = (bx, by, tx, ty, side=1) => `M${bx} ${by} Q${side === 1 ? bx+32 : bx-32} ${by-28} ${tx} ${ty} L${tx-side*8} ${ty+12} Q${side === 1 ? bx+10 : bx-10} ${by+14} ${bx} ${by} Z`; // Angelic Wing
const SWR = (y, x=72, w=35) => `M${x} ${y+1} L${x-5} ${y+1} L${x-5} ${y+7} L${x} ${y+7} Z M${x-7} ${y} L${x-w} ${y} L${x-w-5} ${y+4} L${x-w} ${y+10} L${x-7} ${y+10} Z`; // Reversed Saber (Right-to-Left)
const BRIDGE = (x1, y1, cx, cy, x2, y2) => `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} L${x2} ${y2+12} Q${cx} ${cy+12} ${x1} ${y1+12} Z`; // High-tension connector (prev. Scarf)
const SCARF = (x1, y1, x2, y2) => `M${x1} 4 Q${x1} 64 35 64 L35 76 Q${x1} 76 ${x1} 4 Z`; // Original signature Scarf
const SCIMITAR = (x, y, h, tx, ty, thick=10, mirror=1) => `M${x} ${y} L${x+thick*mirror} ${y} L${x+thick*mirror} ${h} Q${x+thick*mirror} ${ty} ${tx} ${ty} Q${x} ${ty} ${x} ${h} Z`; // Arabic Scimitar Blade
const ROPE = (x, y, w=50, h=72, t=8) => {
  const r = t; // thickness
  return `M${x+w} ${y+h*0.25} Q${x+w} ${y} ${x+w/2} ${y} Q${x} ${y} ${x} ${y+h*0.25} C${x} ${y+h*0.55} ${x+w} ${y+h*0.45} ${x+w} ${y+h*0.75} Q${x+w} ${y+h} ${x+w/2} ${y+h} Q${x} ${y+h} ${x} ${y+h*0.75} L${x+r} ${y+h*0.75} Q${x+r} ${y+h-r} ${x+w/2} ${y+h-r} Q${x+w-r} ${y+h-r} ${x+w-r} ${y+h*0.75} C${x+w-r} ${y+h*0.55} ${x+r} ${y+h*0.45} ${x+r} ${y+h*0.25} Q${x+r} ${y+r} ${x+w/2} ${y+r} Q${x+w-r} ${y+r} ${x+w-r} ${y+h*0.25} Z`;
}; // Spiral Rope Element (ressort)
const COIL = (x, y, w, h, reversal=false) => {
  const mx = reversal ? -1 : 1;
  const dx = reversal ? w : 0;
  return `M${x+dx+mx*w} ${y+h*0.25} Q${x+dx+mx*w} ${y} ${x+dx+mx*w/2} ${y} Q${x+dx} ${y} ${x+dx} ${y+h*0.25} C${x+dx} ${y+h*0.5} ${x+dx+mx*w} ${y+h*0.4} ${x+dx+mx*w} ${y+h*0.65}`;
}; // Half-S Helix element (mirror of the other)

export const K_FONT_LIBRARY = {
  A: { path: `${LANCE(10, 76, 38, 5, 6)} ${LANCE(50, 76, 22, 5, 6)} ${SW(40, 50)}`, width: 60 },
  B: { path: `${T} ${S1} ${S2} ${SW(34, 45)}`, width: 65 },
  C: { path: `${AU} ${AD} ${AL()}`, width: 80 },
  D: { path: `${T} ${S1} ${S2}`, width: 65 },
  E: { path: `${T} ${SW(4)} ${SW(34, 45)} ${SW(68)}`, width: 65 },
  F: { path: `${T} ${SW(4)} ${SW(34, 45)}`, width: 65 },
  G: { path: `${AU} ${AD} ${AL()} ${SWR(40, 72, 35)} ${POLE(66, 40, 76)}`, width: 80 },
  H: { path: `${T} M50 76 L53 4 L56 76 Z ${SW(34, 45)}`, width: 65 },
  I: { path: "M5 76 L8 4 L11 76 Z", width: 16 },
  J: { path: `${BRIDGE(55, 4, 55, 64, 35, 64)} ${BRIDGE(35, 64, 15, 64, 15, 45)}`, width: 65 },
  K: { path: `M12 76 L15 4 L18 76 Z ${ANGEL_WING(18, 50, 75, 18, 1)} ${KATANA(18, 50)}`, width: 75 },
  L: { path: `${T} ${SW(68)}`, width: 55 },
  M: { path: `M5 76 L8 4 L11 76 Z M55 76 L58 4 L61 76 Z ${BIRD_WING(11, 15, 33, 50, 1)} ${BIRD_WING(55, 15, 33, 50, -1)}`, width: 65 },
  N: { path: `${T} M50 76 L53 4 L56 76 Z ${BIRD_WING(11, 4, 53, 76, 1)}`, width: 65 },
  O: { path: `${AU} ${AD} ${AL()} ${AR()}`, width: 80 },
  P: { path: `${T} ${S1} ${SW(34, 45)}`, width: 65 },
  Q: { path: `${AU} ${AD} ${AL()} ${AR()} ${KATANA(45, 50, 1.6)}`, width: 80 },
  R: { path: `${T} ${S1} ${SW(34, 45)} ${KATANA(14, 50)}`, width: 65 },
  S: { path: ROPE(10, 4, 55, 72, 8), width: 75 },
  T: { path: `${LS(4, 65, 32)} M29 76 L32 12 L35 76 Z`, width: 65 },
  U: { path: `${SCIMITAR(8, 4, 50, 35, 76, 10, 1)} ${SCIMITAR(62, 4, 50, 35, 76, 10, -1)}`, width: 70 },
  V: { path: `${BIRD_WING(12, 4, 35, 76, 1)} ${BIRD_WING(58, 4, 35, 76, -1)}`, width: 70 },
  W: { path: `${BIRD_WING(5, 4, 20, 76, 1)} ${BIRD_WING(65, 4, 50, 76, -1)} ${LANCE(20, 76, 45, 10, 6)} ${LANCE(50, 76, 25, 10, 6)}`, width: 70 },
  X: { path: `${LANCE(5, 76, 55, 4, 6)} ${LANCE(55, 76, 5, 4, 6)}`, width: 60 },
  Y: { path: `M30 40 L33 76 L36 40 Z ${BIRD_WING(10, 4, 33, 40, 1)} ${BIRD_WING(56, 4, 33, 40, -1)}`, width: 65 },
  Z: { path: `${LS(4, 65, 32)} ${LS(68, 65, 32)} ${LANCE(55, 12, 5, 68, 6)}`, width: 65 },
  "0": { path: `${AU} ${AD} ${AL()} ${AR()} M20 60 L60 20 L65 25 L25 70 Z`, width: 80 }
};
