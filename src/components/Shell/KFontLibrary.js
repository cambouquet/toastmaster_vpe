const T = "M8 76 L11 4 L14 76 Z"; // Tower
const S1 = "M14 4 Q60 4 65 35 L55 35 Q50 14 14 14 Z"; // Upper Sail
const S2 = "M14 76 Q60 76 65 45 L55 45 Q50 66 14 66 Z"; // Lower Sail
const KT_L = "M18 50 Q50 68 76 78 L68 78 Q44 68 18 54 Z"; // Katana (Lower)
const KT_U = "M18 32 Q50 4 75 18 L28 42 Z"; // Wing (Upper)
const KT_M = "M10 42 L21 53 L18 56 L7 45 Z"; // Hilt/Joint
const SW = (y, w=55) => `M11 ${y+1} L16 ${y+1} L16 ${y+7} L11 ${y+7} Z M18 ${y} L${w} ${y} L${w+5} ${y+4} L${w} ${y+8} L18 ${y+8} Z`; // Single Light Saber
const LS = (y, w=65, mid=32) => `M${mid-3} ${y+1} L${mid+3} ${y+1} L${mid+3} ${y+7} L${mid-3} ${y+7} Z M${mid+5} ${y} L${w-5} ${y} L${w} ${y+4} L${w-5} ${y+8} L${mid+5} ${y+8} Z M${mid-5} ${y} L5 ${y} L0 ${y+4} L5 ${y+8} L${mid-5} ${y+8} Z`; // Dual-Blade Light Stick

export const K_FONT_LIBRARY = {
  A: { path: "M20 76 L25 4 L30 76 Z M28 4 L55 76 L45 76 L30 42 L12 42 L5 76 L0 76 Z M20 40 L32 40 L30 25 Z", width: 55 },
  B: { path: `${T} ${S1} ${S2} ${SW(34, 45)}`, width: 65 },
  C: { path: "M55 15 Q50 4 30 4 Q5 4 5 40 Q5 76 30 76 Q50 76 55 65 L45 65 Q45 66 30 66 Q15 66 15 40 Q15 14 30 14 Q45 14 45 15 Z", width: 55 },
  D: { path: `${T} ${S1} ${S2}`, width: 65 },
  E: { path: `${T} ${SW(4)} ${SW(34, 45)} ${SW(68)}`, width: 65 },
  F: { path: `${T} ${SW(4)} ${SW(34, 45)}`, width: 65 },
  G: { path: "M55 15 Q50 4 30 4 Q5 4 5 40 Q5 76 30 76 Q50 76 55 65 L45 65 Q45 66 30 66 Q15 66 15 40 Q15 14 30 14 Q45 14 45 15 Z ${SW(45, 35)}", width: 55 },
  H: { path: `${T} M50 76 L53 4 L56 76 Z ${SW(34, 45)}`, width: 65 },
  I: { path: "M5 76 L8 4 L11 76 Z", width: 16 },
  J: { path: "M10 60 Q10 76 35 76 Q60 76 60 4 L50 4 L50 66 Q50 66 35 66 Q20 66 20 60 Z", width: 60 },
  K: { path: `M12 76 L15 4 L18 76 Z ${KT_U} ${KT_M} ${KT_L}`, width: 75 },
  L: { path: `${T} ${SW(68)}`, width: 55 },
  M: { path: "M5 76 L5 4 L30 40 L55 4 L55 76 L45 76 L45 20 L30 45 L15 20 L15 76 Z", width: 60 },
  N: { path: "M8 76 L8 4 L18 4 L45 55 L45 4 L55 4 L55 76 L45 76 L18 20 L18 76 Z", width: 60 },
  O: { path: "M30 4 Q5 4 5 40 Q5 76 30 76 Q55 76 55 40 Q55 4 30 4 M30 14 Q45 14 45 40 Q45 66 30 66 Q15 66 15 40 Q15 14 30 14 Z", width: 60 },
  P: { path: `${T} ${S1} ${SW(34, 45)}`, width: 65 },
  Q: { path: "M30 4 Q5 4 5 40 Q5 76 30 76 Q55 76 55 40 Q55 4 30 4 M30 14 Q45 14 45 40 Q45 66 30 66 Q15 66 15 40 Q15 14 30 14 Z M40 60 L60 80 L65 75 L45 55 Z", width: 65 },
  R: { path: `${T} ${S1} ${SW(34, 45)} ${KT_L}`, width: 65 },
  S: { path: "M55 20 Q55 4 30 4 Q5 4 5 30 L15 30 Q15 14 30 14 Q45 14 45 25 Q30 35 5 45 Q5 76 30 76 Q55 76 55 55 L45 55 Q45 66 30 66 Q15 66 15 55 Q30 45 55 35 Z", width: 55 },
  T: { path: `${LS(4, 65, 32)} M29 76 L32 12 L35 76 Z`, width: 65 },
  U: { path: "M8 4 Heart L18 4 L18 50 Q18 76 35 76 Q52 76 52 50 L52 4 L62 4 L62 50 Q62 76 35 76 Q8 76 8 50 Z", width: 70 },
  V: { path: "M5 4 L15 4 L30 65 L45 4 L55 4 L30 76 Z", width: 60 },
  W: { path: "M5 4 L15 4 L25 40 L35 4 L45 4 L55 76 L45 76 L35 25 L25 76 L15 76 Z", width: 60 },
  X: { path: "M5 4 L15 4 L30 35 L45 4 L55 4 L35 40 L55 76 L45 76 L30 45 L15 76 L5 76 L25 40 Z", width: 60 },
  Y: { path: "M5 4 L15 4 L30 35 L45 4 L55 4 L33 40 L36 76 L27 76 L30 40 Z", width: 60 },
  Z: { path: `${LS(4, 65, 32)} ${LS(68, 65, 32)} M60 12 L50 12 L0 68 L10 68 Z`, width: 65 },
  "0": { path: "M30 4 Q5 4 5 40 Q5 76 30 76 Q55 76 55 40 Q55 4 30 4 M30 14 Q45 14 45 40 Q45 66 30 66 Q15 66 15 40 Q15 14 30 14 Z M50 10 L10 70 L15 75 L55 15 Z", width: 60 }
};
