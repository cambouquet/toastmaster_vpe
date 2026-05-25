const TOWER = (x, h=4, b=76) => `M${x} ${b} L${x+2.5} ${h} L${x+5} ${b} Z`; // Forged Pillar
const S1 = (x=6) => `M${x} 4 Q25 4 44 35 L38 35 Q25 14 ${x} 14 Z`; // Upper Sail
const S2 = (x=6) => `M${x} 76 Q25 76 44 45 L38 45 Q25 66 ${x} 66 Z`; // Lower Sail
const KT_U = (x=10) => `M${x} 32 Q30 4 48 18 L18 42 Z`; // Wing (Upper)
const KATANA = (x, y, s=0.8) => `M${x-8*s} ${y-8*s} L${x+3*s} ${y+3*s} L${x} ${y+6*s} L${x-11*s} ${y-5*s} Z M${x} ${y} Q${x+25*s} ${y+15*s} ${x+45*s} ${y+25*s} L${x+40*s} ${y+25*s} Q${x+20*s} ${y+15*s} ${x} ${y+4*s} Z`; // Handle + Blade
const SW = (y, w=44, x=6) => `M${x} ${y+1} L${x+4} ${y+1} L${x+4} ${y+7} L${x} ${y+7} Z M${x+6} ${y} L${w-5} ${y} L${w} ${y+4} L${w-5} ${y+8} L${x+6} ${y+8} Z`; // Single Light Saber
const LS = (y, w=48, mid=25) => `M${mid-3} ${y+1} L${mid+3} ${y+1} L${mid+3} ${y+7} L${mid-3} ${y+7} Z M${mid+5} ${y} L${w-2} ${y} L${w+2} ${y+4} L${w-2} ${y+8} L${mid+5} ${y+8} Z M${mid-5} ${y} L${50-w+2} ${y} L${50-w-2} ${y+4} L${50-w+2} ${y+8} L${mid-5} ${y+8} Z`; // Dual-Blade Light Stick

const AU = (x=6) => `M${x} 20 Q25 -10 44 20 L44 30 Q25 0 ${x} 30 Z`; // Round Top
const AD = (x=6) => `M${x} 60 Q25 90 44 60 L44 50 Q25 80 ${x} 50 Z`; // Round Bot
const AL = (x=12, y1=15, y2=65) => `M${x} ${y1} Q-5 40 ${x} ${y2} L${x+8} ${y2} Q3 40 ${x+8} ${y1} Z`; // Round Left
const AR = (x=38, y1=15, y2=65) => `M${x} ${y1} Q55 40 ${x} ${y2} L${x-8} ${y2} Q47 40 ${x-8} ${y1} Z`; // Round Right
const LANCE = (bx, by, tx, ty, w=8) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const ux = dx/len;
  const uy = dy/len;
  const vx = -uy;
  const vy = ux;
  const hlen = 12; // length of head
  const hx = tx - ux * hlen;
  const hy = ty - uy * hlen;
  return `M${bx-vx*w/2} ${by-vy*w/2} L${hx-vx*w/2} ${hy-vy*w/2} L${hx-vx*w} ${hy-vy*w} L${tx} ${ty} L${hx+vx*w} ${hy+vy*w} L${hx+vx*w/2} ${hy+vy*w/2} L${bx+vx*w/2} ${by+vy*w/2} Z`;
}; // Rotational Vector Lance with Arrowhead
const POINT = (x, y, w=8, h=14) => `M${x} ${y} L${x+w/2} ${y+h} L${x} ${y+h*0.7} L${x-w/2} ${y+h} Z`; // Forged Weapon Tip (Pointe)
const BIRD_WING = (bx, by, tx, ty, side=1) => {
  const cx = bx + (tx-bx)*0.4 - side*10; 
  const cy = by + (ty-by)*0.5;
  return `M${bx} ${by} Q${cx} ${cy} ${tx} ${ty} Q${cx+side*5} ${cy} ${bx+side*8} ${by} Z`;
}; // Bird Wing (Scythe silhouette)
const ANGEL_WING = (bx, by, tx, ty, side=1) => `M${bx} ${by} Q${side === 1 ? bx+25 : bx-25} ${by-25} ${tx} ${ty} L${tx-side*6} ${ty+10} Q${side === 1 ? bx+8 : bx-8} ${by+12} ${bx} ${by} Z`; // Angelic Wing
const SWR = (y, x=44, w=25) => `M${x} ${y+1} L${x-4} ${y+1} L${x-4} ${y+7} L${x} ${y+7} Z M${x-6} ${y} L${x-w} ${y} L${x-w-4} ${y+4} L${x-w} ${y+8} L${x-6} ${y+8} Z`; // Reversed Saber (Right-to-Left)
const BRIDGE = (x1, y1, cx, cy, x2, y2) => `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} L${x2} ${y2+10} Q${cx} ${cy+10} ${x1} ${y1+10} Z`; // High-tension connector (prev. Scarf)
const SCARF = (x1, y1, x2, y2) => `M${x1} 4 Q${x1} 64 25 64 L25 76 Q${x1} 76 ${x1} 4 Z`; // Original signature Scarf
const GLOW_RING = (x, y, r) => `M${x-r} ${y} A${r} ${r} 0 1 1 ${x+r} ${y} A${r} ${r} 0 1 1 ${x-r} ${y} Z`;
const SCIMITAR = (x, y, h, tx, ty, thick=8, mirror=1) => `M${x} ${y} L${x+thick*mirror} ${y} L${x+thick*mirror} ${h} Q${x+thick*mirror} ${ty} ${tx} ${ty} Q${x} ${ty} ${x} ${h} Z`; // Arabic Scimitar Blade
const ROPE = (x, y, w=35, h=72, t=6) => {
  const r = t; // thickness
  return `M${x+w} ${y+h*0.25} Q${x+w} ${y} ${x+w/2} ${y} Q${x} ${y} ${x} ${y+h*0.25} C${x} ${y+h*0.55} ${x+w} ${y+h*0.45} ${x+w} ${y+h*0.75} Q${x+w} ${y+h} ${x+w/2} ${y+h} Q${x} ${y+h} ${x} ${y+h*0.75} L${x+r} ${y+h*0.75} Q${x+r} ${y+h-r} ${x+w/2} ${y+h-r} Q${x+w-r} ${y+h-r} ${x+w-r} ${y+h*0.75} C${x+w-r} ${y+h*0.55} ${x+r} ${y+h*0.45} ${x+r} ${y+h*0.25} Q${x+r} ${y+r} ${x+w/2} ${y+r} Q${x+w-r} ${y+r} ${x+w-r} ${y+h*0.25} Z`;
}; // Spiral Rope Element (ressort)
const COIL = (x, y, w, h, reversal=false) => {
  const mx = reversal ? -1 : 1;
  const dx = reversal ? w : 0;
  return `M${x+dx+mx*w} ${y+h*0.25} Q${x+dx+mx*w} ${y} ${x+dx+mx*w/2} ${y} Q${x+dx} ${y} ${x+dx} ${y+h*0.25} C${x+dx} ${y+h*0.5} ${x+dx+mx*w} ${y+h*0.4} ${x+dx+mx*w} ${y+h*0.65}`;
}; // Half-S Helix element (mirror of the other)

export const K_FONT_LIBRARY = {
  A: { path: `${LANCE(8, 76, 30, 4, 6)} ${LANCE(42, 76, 20, 4, 6)} ${SW(40, 40, 10)}`, width: 50 },
  B: { path: `${TOWER(8)} ${S1(12)} ${S2(12)} ${SW(34, 40, 10)}`, width: 50 },
  C: { path: `${AU(6)} ${AD(6)} ${AL(12)}`, width: 50 },
  D: { path: `${TOWER(10)} ${S1(15)} ${S2(15)}`, width: 50 },
  E: { path: `${TOWER(8)} ${SW(4, 44, 10)} ${SW(34, 38, 10)} ${SW(68, 44, 10)}`, width: 50 },
  F: { path: `${TOWER(8)} ${SW(4, 44, 10)} ${SW(34, 38, 10)}`, width: 50 },
  G: { path: `${AU(6)} ${AD(6)} ${AL(12)} ${SWR(40, 46, 25)} ${TOWER(40, 40, 76)}`, width: 50 },
  H: { path: `${TOWER(8)} ${TOWER(38)} ${SW(34, 42, 10)}`, width: 50 },
  I: { path: TOWER(22), width: 50 },
  J: { path: `${BRIDGE(44, 4, 44, 64, 25, 64)} ${BRIDGE(25, 64, 10, 64, 10, 45)}`, width: 50 },
  K: { path: `${TOWER(10)} ${ANGEL_WING(14, 50, 44, 18, 1)} ${KATANA(14, 50)}`, width: 50 },
  L: { path: `${TOWER(12)} ${SW(68, 40, 15)}`, width: 50 },
  M: { path: `${TOWER(6)} ${TOWER(40)} ${BIRD_WING(10, 4, 25, 30, 1)} ${BIRD_WING(40, 4, 25, 30, -1)}`, width: 50 },
  N: { path: `${TOWER(8)} ${TOWER(38)} ${BIRD_WING(12, 4, 38, 76, 1)}`, width: 50 },
  O: { path: `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)} ${GLOW_RING(25, 40, 5)}`, width: 50 },
  P: { path: `${TOWER(8)} ${S1(12)} ${SW(34, 38, 10)}`, width: 50 },
  Q: { path: `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)} ${KATANA(30, 50, 1.2)}`, width: 50 },
  R: { path: `${TOWER(8)} ${S1(12)} ${SW(34, 38, 10)} ${KATANA(12, 50)}`, width: 50 },
  S: { path: ROPE(10, 4, 32, 72, 6), width: 50 },
  T: { path: `${LS(4, 46, 25)} ${TOWER(22, 12)}`, width: 50 },
  U: { path: `${SCIMITAR(8, 4, 50, 25, 76, 8, 1)} ${SCIMITAR(42, 4, 50, 25, 76, 8, -1)}`, width: 50 },
  V: { path: `${BIRD_WING(10, 4, 25, 76, 1)} ${BIRD_WING(40, 4, 25, 76, -1)}`, width: 50 },
  W: { path: `${BIRD_WING(6, 4, 18, 76, 1)} ${BIRD_WING(44, 4, 32, 76, -1)} ${LANCE(18, 76, 32, 12, 5)} ${LANCE(32, 76, 18, 12, 5)}`, width: 50 },
  X: { path: `${LANCE(10, 76, 40, 4, 5)} ${LANCE(40, 76, 10, 4, 5)}`, width: 50 },
  Y: { path: `${TOWER(22, 40, 76)} ${BIRD_WING(10, 4, 25, 40, 1)} ${BIRD_WING(40, 4, 25, 40, -1)}`, width: 50 },
  Z: { path: `${LS(4, 46, 25)} ${LS(68, 46, 25)} ${LANCE(40, 12, 10, 68, 6)}`, width: 50 },
  "0": { path: `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)}`, width: 50 }
};
