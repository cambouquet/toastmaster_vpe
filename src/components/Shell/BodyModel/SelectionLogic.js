import { project } from './Projection';
import { getAllLinks } from './ModelTopology';

const distToSeg = (px, py, x1, y1, x2, y2) => {
  const dx = x2 - x1, dy = y2 - y1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
};

export const findSelectedSegment = (mx, my, nodes, rot, scale, center, target) => {
  if (nodes.apple) {
    const ap = project(nodes.apple[0], nodes.apple[1], nodes.apple[2], rot, scale, center, target);
    if (Math.hypot(mx - ap.x, my - ap.y) < 60) return { x: nodes.apple[0], y: nodes.apple[1], z: nodes.apple[2], isApple: true, p1: ap, p2: ap };
  }
  let best = null, minDist = 200;
  getAllLinks().forEach(([a, b]) => {
    const p1 = nodes[a], p2 = nodes[b];
    if (!p1 || !p2) return;
    const pr1 = project(p1[0], p1[1], p1[2], rot, scale, center, target);
    const pr2 = project(p2[0], p2[1], p2[2], rot, scale, center, target);
    const d = distToSeg(mx, my, pr1.x, pr1.y, pr2.x, pr2.y);
    if (d < minDist) {
      minDist = d;
      best = { x: (p1[0] + p2[0]) / 2, y: (p1[1] + p2[1]) / 2, z: (p1[2] + p2[2]) / 2, p1: pr1, p2: pr2 };
    }
  });
  return minDist < 150 ? best : null;
};
