export const getModelNodes = (t) => {
  const b = Math.sin(t*0.001)*0.02, o = Math.max(0, Math.sin(t*0.004))*0.06, n = {};
  const add = (k, v) => n[k] = v;
  add('hT', [0,-0.85+b,0]); add('hB', [0,-0.6+b,0]); add('neck', [0,-0.5+b,0]); add('spine', [0,0,0]);
  add('hF', [0, -0.72+b, 0.12]); add('hK', [0, -0.72+b, -0.12]);
  add('hL', [-0.12, -0.72+b, 0]); add('hR', [0.12, -0.72+b, 0]);
  add('mU', [0, -0.68+b, 0.13]); add('mL', [0, -0.68+b+o, 0.13]); // Mouth upper/lower
  add('lE', [-0.04, -0.75+b, 0.11]); add('rE', [0.04, -0.75+b, 0.11]); // Eyes
  add('lS', [-0.25,-0.45+b,0]); add('rS', [0.25,-0.45+b,0]);
  add('lE', [-0.4,-0.1,0.1]); add('rE', [0.4,-0.1,0.1]);
  add('lH', [-0.5,0.25,0.2]); add('rH', [0.5,0.25,0.2]);
  const setupFinger = (side, id, x, y, z, len, isT) => {
    const s = side === 'l' ? -1 : 1, fz = Math.sin(t*0.002 + x*20) * 0.015;
    const wr = n[`${side}H`];
    const carpal = [wr[0] + s*x*0.015, wr[1] + 0.01, wr[2] + z];
    const meta = [carpal[0] + s*x*0.02, carpal[1] + 0.02, carpal[2] + z];
    const knuckle = [meta[0] + s*x*0.02, meta[1] + 0.03, meta[2] + z];
    const fNode = [knuckle[0]+s*x*0.01, knuckle[1]+len, knuckle[2]+fz];
    const getPos = (tr) => [knuckle[0]+(fNode[0]-knuckle[0])*tr, knuckle[1]+(fNode[1]-knuckle[1])*tr, knuckle[2]+(fNode[2]-knuckle[2])*tr];
    n[`${side}${id}0`] = carpal; n[`${side}${id}05`] = meta; n[`${side}${id}1`] = knuckle;
    n[`${side}${id}2`] = getPos(0.4); n[`${side}${id}3`] = getPos(0.7); n[`${side}${id}4`] = getPos(1.0);
  };
  ['l','r'].forEach(s => {
    // Thumb (T) tightened and shortened further to avoid "detached" look.
    const args = [['T',-0.022,0,0.015,0.025,true], ['I',-0.015,0,0.005,0.07], ['M',0,0,0,0.08], ['R',0.015,0,-0.005,0.07], ['P',0.03,0,-0.012,0.05]];
    args.forEach(a => setupFinger(s, ...a));
  });
  add('lHip', [-0.15,0.1,0.05]); add('rHip', [0.15,0.1,0.05]);
  add('lK', [-0.2,0.5,0.1]); add('rK', [0.2,0.5,0.1]);
  add('lF', [-0.22,0.85,0.15]); add('rF', [0.22,0.85,0.15]);
  return n;
};
