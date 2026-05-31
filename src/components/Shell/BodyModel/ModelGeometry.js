export const getModelNodes = (t) => {
  const b = Math.sin(t*0.001)*0.02, o = Math.max(0, Math.sin(t*0.004))*0.06, n = {};
  const sw = Math.sin(t * 0.0015); // Global sway
  const add = (k, v) => n[k] = v;
  const hX = sw*0.02;
  add('hT', [hX,-0.81+b,0]); add('hB', [hX,-0.6+b,0]); add('neck', [sw*0.01,-0.5+b,0]); add('spine', [0,0,0]);
  add('hF', [hX, -0.72+b, 0.15]); add('hK', [hX, -0.72+b, -0.15]);
  add('hL', [hX-0.12, -0.72+b, 0]); add('hR', [hX+0.12, -0.72+b, 0]);
  add('hFL', [hX-0.09, -0.75+b, 0.12]); add('hFR', [hX+0.09, -0.75+b, 0.12]);
  add('hKL', [hX-0.09, -0.75+b, -0.12]); add('hKR', [hX+0.09, -0.75+b, -0.12]);
  add('m1', [hX-0.03, -0.66+b, 0.15]); add('m2', [hX+0.03, -0.66+b, 0.15]); 
  add('m3', [hX, -0.63+b+o*0.5, 0.15]);
  add('hJF', [hX, -0.62+b, 0.12]); add('hJL', [hX-0.08, -0.65+b, 0.08]); add('hJR', [hX+0.08, -0.65+b, 0.08]);
  add('lE', [hX-0.04, -0.75+b, 0.14]); add('rE', [hX+0.04, -0.75+b, 0.14]);
  add('lS', [-0.25,-0.45+b,0.05*Math.cos(t*0.01)]); add('rS', [0.25,-0.45+b,-0.05*Math.cos(t*0.01)]);
  add('lEl', [-0.5,-0.1,0.1]); add('rEl', [0.5,-0.1,0.1]);
  add('lH', [-0.75, 0.2 + b, 0.2]); add('rH', [0.75, 0.2 + b, 0.2]);
  add('apple', [0.4, 0.58, 0.1]);
  const setupFinger = (side, id, x, y, z, len, isT) => {
    let f = side === 'r' ? 1.0 : Math.max(0, Math.sin(t*0.002 + x*10)) * 0.5;
    if (t > 1000000) f = Math.min(1.2, (t % 6000) / 3000); // Trailer grasp
    const wr = n[`${side}H`], carp = [wr[0] + (side === 'l' ? -1 : 1)*x*0.02, wr[1] + 0.01, wr[2] + z];
    const meta = [carp[0] + (side === 'l' ? -1 : 1)*x*0.01, carp[1] + 0.04, carp[2] + z*0.5], knuc = [meta[0], meta[1] + 0.01, meta[2]];
    const ang = f * (isT ? -0.8 : 1.3), s1 = isT ? 0.6 : 0.4, s2 = isT ? 0.4 : 0.3, s3 = 0.3;
    const p2 = [knuc[0], knuc[1] + len*s1*Math.cos(ang*0.5), knuc[2] + len*s1*Math.sin(ang*0.5)];
    const p3 = [p2[0], p2[1] + len*s2*Math.cos(ang), p2[2] + len*s2*Math.sin(ang)];
    const p4 = [p3[0], p3[1] + len*s3*Math.cos(ang*1.2), p3[2] + len*s3*Math.sin(ang*1.2)];
    n[`${side}${id}0`] = carp; n[`${side}${id}05`] = isT ? carp : meta; n[`${side}${id}1`] = knuc;
    n[`${side}${id}2`] = p2; n[`${side}${id}3`] = p3; n[`${side}${id}4`] = p4;
  };
  ['l','r'].forEach(s => {
    const fgs = [['T',-0.022,0,0.015,0.025,true], ['I',-0.015,0,0.005,0.07], ['M',0,0,0,0.08], ['R',0.015,0,-0.005,0.07], ['P',0.03,0,-0.012,0.05]];
    fgs.forEach(a => setupFinger(s, ...a));
  });
  const lhZ = 0.05 + Math.sin(t*0.001)*0.02, rhZ = 0.05 - Math.sin(t*0.001)*0.02;
  add('lHip', [-0.15,0.1,lhZ]); add('rHip', [0.15,0.1,rhZ]);
  add('lK', [-0.2+sw*0.01, 0.5+Math.sin(t*0.0013)*0.04, 0.1]); 
  add('rK', [0.2+sw*0.01, 0.5-Math.sin(t*0.0013)*0.04, 0.1]);
  add('lF', [-0.22, 0.85+Math.sin(t*0.001)*0.02, 0.15]); 
  add('rF', [0.22, 0.85-Math.sin(t*0.001)*0.02, 0.15]);
  return n;
};
