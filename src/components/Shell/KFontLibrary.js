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
const SWR = (y, x=72, w=35) => `M${x} ${y+1} L${x-5} ${y+1} L${x-5} ${y+7} L${x} ${y+7} Z M${x-7} ${y} L${x-w} ${y} L${x-w-5} ${y+4} L${x-w} ${y+10} L${x-7} ${y+10} Z`; // Reversed Saber (Right-to-Left)
const SCARF = (x1, y1, cx, cy, x2, y2) => `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} L${x2} ${y2+12} Q${cx} ${cy+12} ${x1} ${y1+12} Z`; // Solid Weapon Blade (12 units)
const SCIMITAR = (x, y, h, tx, ty, thick=10, mirror=1) => `M${x} ${y} L${x+thick*mirror} ${y} L${x+thick*mirror} ${h} Q${x+thick*mirror} ${ty} ${tx} ${ty} Q${x} ${ty} ${x} ${h} Z`; // Arabic Scimitar Blade

export const K_FONT_LIBRARY = {
  A: { path: `M5 76 L25 4 L30 76 Z M55 76 L35 4 L30 76 Z ${SW(40, 48)}`, width: 60 },
  B: { path: `${T} ${S1} ${S2} ${SW(34, 45)}`, width: 65 },
  C: { path: `${AU} ${AD} ${AL()}`, width: 80 },
  D: { path: `${T} ${S1} ${S2}`, width: 65 },
  E: { path: `${T} ${SW(4)} ${SW(34, 45)} ${SW(68)}`, width: 65 },
  F: { path: `${T} ${SW(4)} ${SW(34, 45)}`, width: 65 },
  G: { path: `${AU} ${AD} ${AL()} ${SWR(40, 72, 35)} ${POLE(66, 40, 76)}`, width: 80 },
  H: { path: `${T} M50 76 L53 4 L56 76 Z ${SW(34, 45)}`, width: 65 },
  I: { path: "M5 76 L8 4 L11 76 Z", width: 16 },
  J: { path: `${SCARF(55, 4, 55, 64, 35, 64)} ${SCARF(35, 64, 15, 64, 15, 45)}`, width: 65 },
  K: { path: `M12 76 L15 4 L18 76 Z ${KT_U} ${KATANA(18, 50)}`, width: 75 },
  L: { path: `${T} ${SW(68)}`, width: 55 },
  M: { path: "M5 76 L8 4 L11 76 Z M30 76 L33 30 L36 76 Z M55 76 L58 4 L61 76 Z M11 15 L25 50 L35 50 L50 15 L45 15 L32 40 L20 15 Z", width: 65 },
  N: { path: `${T} M50 76 L53 4 L56 76 Z M14 15 L50 65 L50 76 L14 26 Z`, width: 65 },
  O: { path: `${AU} ${AD} ${AL()} ${AR()}`, width: 80 },
  P: { path: `${T} ${S1} ${SW(34, 45)}`, width: 65 },
  Q: { path: `${AU} ${AD} ${AL()} ${AR()} ${KATANA(45, 50, 1.6)}`, width: 80 },
  R: { path: `${T} ${S1} ${SW(34, 45)} ${KATANA(14, 50)}`, width: 65 },
  S: { path: "M60 15 Q60 4 35 4 Q10 4 10 30 Q10 40 35 40 Q60 40 60 50 Q60 76 35 76 Q10 76 10 65 L22 65 Q22 66 35 66 Q48 66 48 50 Q48 50 35 50 Q12 50 12 30 Q12 14 35 14 Q48 14 48 15 Z", width: 70 },
  T: { path: `${LS(4, 65, 32)} M29 76 L32 12 L35 76 Z`, width: 65 },
  U: { path: `${SCIMITAR(8, 4, 50, 35, 76, 10, 1)} ${SCIMITAR(62, 4, 50, 35, 76, 10, -1)}`, width: 70 },
  W: { path: "M5 4 L15 76 L25 76 L35 30 L45 76 L55 76 L65 4 L55 4 L48 60 L40 10 L30 10 L22 60 L15 4 Z", width: 70 },
  X: { path: `M5 4 L25 42 L5 76 L15 76 L30 50 L45 76 L55 76 L35 42 L55 4 L45 4 L30 35 L15 4 Z`, width: 60 },
  Y: { path: `M5 4 L25 42 L25 76 L35 76 L35 42 L55 4 L45 4 L30 30 L15 4 Z`, width: 60 },
  Z: { path: `${LS(4, 65, 32)} ${LS(68, 65, 32)} M60 12 L50 12 L0 68 L10 68 Z`, width: 65 },
  "0": { path: `${AU} ${AD} ${AL()} ${AR()} M20 60 L60 20 L65 25 L25 70 Z`, width: 80 }
};
