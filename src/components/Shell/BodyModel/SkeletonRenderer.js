export const drawSkeleton = (ctx, p) => {
  const link = (a, b, col = '#00bac4', w = 2) => {
    if (!p[a] || !p[b]) return;
    ctx.strokeStyle = col; ctx.lineWidth = w * p[a].s;
    ctx.beginPath(); ctx.moveTo(p[a].x, p[a].y); ctx.lineTo(p[b].x, p[b].y); ctx.stroke();
  };
  ['hF','hK','hL','hR'].forEach(n => { link('hT', n, '#fff', 1); link('hB', n, '#fff', 1); });
  link('hF','hL','#fff',1); link('hF','hR','#fff',1); link('hK','hL','#fff',1); link('hK','hR','#fff',1);
  link('hB', 'neck'); link('neck', 'spine'); link('lS', 'rS'); link('neck', 'lS'); link('neck', 'rS');
  link('lS', 'lE'); link('lE', 'lH'); link('rS', 'rE'); link('rE', 'rH');
  ['l','r'].forEach(s => {
    ['T','I','M','R','P'].forEach(f => {
      const isT = f === 'T';
      link(`${s}H`, `${s}${f}0`, '#00bac4', 1.5); // Link wrist to metacarpal starts
      link(`${s}${f}0`, `${s}${f}05`, '#00bac4', isT ? 3 : 2.4); 
      link(`${s}${f}05`, `${s}${f}1`, '#00bac4', isT ? 2.8 : 2.2); 
      link(`${s}${f}1`, `${s}${f}2`, '#00bac4', isT ? 2.4 : 1.8); 
      link(`${s}${f}2`, `${s}${f}3`, '#00bac4', isT ? 2.0 : 1.4);
      link(`${s}${f}3`, `${s}${f}4`, '#00bac4', isT ? 1.6 : 1.0);
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
};
