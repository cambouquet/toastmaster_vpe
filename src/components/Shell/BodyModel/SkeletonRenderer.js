export const drawSkeleton = (ctx, p) => {
  const link = (a, b, col = '#00bac4', w = 2) => {
    if (!p[a] || !p[b]) return;
    ctx.strokeStyle = col; ctx.lineWidth = w * p[a].s;
    ctx.beginPath(); ctx.moveTo(p[a].x, p[a].y); ctx.lineTo(p[b].x, p[b].y); ctx.stroke();
  };
  const dot = (n, c = '#fff', r = 2.5) => {
    if (!p[n]) return;
    ctx.fillStyle = c; ctx.beginPath();
    ctx.arc(p[n].x, p[n].y, r * p[n].s, 0, Math.PI * 2); ctx.fill();
  };
  ['hF','hK','hL','hR'].forEach(n => { link('hT', n, '#fff', 1); link('hB', n, '#fff', 1); });
  link('hF','hL','#fff',1); link('hF','hR','#fff',1); link('hK','hL','#fff',1); link('hK','hR','#fff',1);
  dot('lE'); dot('rE'); dot('mU', '#f00', 1.5); dot('mL', '#f00', 1.5);
  link('mU', 'hL', '#00bac4', 1); link('mU', 'hR', '#00bac4', 1);
  link('mU', 'mL', '#f00', 3);
  link('hB', 'neck'); link('neck', 'spine'); link('lS', 'rS'); link('neck', 'lS'); link('neck', 'rS');
  link('lS', 'lE'); link('lE', 'lH'); link('rS', 'rE'); link('rE', 'rH');
  ['neck', 'spine', 'lS', 'rS', 'lE', 'rE', 'lH', 'rH'].forEach(n => dot(n));
  ['l','r'].forEach(s => {
    dot(`${s}H`); // Wrist dot
    ['T','I','M','R','P'].forEach(f => {
      const isT = f === 'T';
      link(`${s}H`, `${s}${f}0`, '#00bac4', 1.5); // Link wrist to metacarpal starts
      link(`${s}${f}0`, `${s}${f}05`, '#00bac4', isT ? 2.5 : 2.4); 
      link(`${s}${f}05`, `${s}${f}1`, '#00bac4', isT ? 2.3 : 2.2); 
      link(`${s}${f}1`, `${s}${f}2`, '#00bac4', isT ? 2.0 : 1.8); 
      link(`${s}${f}2`, `${s}${f}3`, '#00bac4', isT ? 1.6 : 1.4);
      link(`${s}${f}3`, `${s}${f}4`, '#00bac4', isT ? 1.2 : 1.0);
      [`${s}${f}0`, `${s}${f}05`, `${s}${f}1`, `${s}${f}2`, `${s}${f}3`, `${s}${f}4`].forEach(n => dot(n, '#00bac4', 1));
    });
    // Link knuckles and mid-palm to form palm volume (excluding thumb)
    ['I','M','R','P'].forEach((f, i, a) => { 
      if(i>0) {
        link(`${s}${a[i-1]}1`, `${s}${f}1`, '#00bac4', 1); 
        link(`${s}${a[i-1]}05`, `${s}${f}05`, '#00bac4', 0.8);
        link(`${s}${a[i-1]}0`, `${s}${f}0`, '#00bac4', 1); 
      }
    });
  });
  link('spine', 'lHip'); link('spine', 'rHip'); link('lHip', 'lK'); link('lK', 'lF'); link('rHip', 'rK'); link('rK', 'rF');
  ['lHip', 'rHip', 'lK', 'rK', 'lF', 'rF'].forEach(n => dot(n));
};
