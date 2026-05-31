export const BODY_STRUCTURE = [
  ['hB', 'neck'], ['neck', 'spine'], ['lS', 'rS'], ['neck', 'lS'], ['neck', 'rS'],
  ['lS', 'lEl'], ['lEl', 'lH'], ['rS', 'rEl'], ['rEl', 'rH'],
  ['spine', 'lHip'], ['spine', 'rHip'], ['lHip', 'lK'], ['lK', 'lF'], ['rHip', 'rK'], ['rK', 'rF'],
  ['hT', 'hF'], ['hT', 'hK'], ['hT', 'hL'], ['hT', 'hR'],
  ['hB', 'hF'], ['hB', 'hK'], ['hB', 'hL'], ['hB', 'hR'],
  ['hF', 'hFL'], ['hF', 'hFR'], ['hL', 'hFL'], ['hR', 'hFR'],
  ['hK', 'hKL'], ['hK', 'hKR'], ['hL', 'hKL'], ['hR', 'hKR'],
  ['hB', 'hJF'], ['hJF', 'hJL'], ['hJF', 'hJR'], ['hL', 'hJL'], ['hR', 'hJR'],
  ['m1', 'm2'], ['m2', 'm3'], ['m3', 'm1']
];

export const getHandLinks = (s) => {
  const links = [];
  ['T','I','M','R','P'].forEach(f => {
    links.push([`${s}H`, `${s}${f}0`]);
    links.push([`${s}${f}0`, `${s}${f}05`]);
    links.push([`${s}${f}05`, `${s}${f}1`]);
    links.push([`${s}${f}1`, `${s}${f}2`]);
    links.push([`${s}${f}2`, `${s}${f}3`]);
    if (f !== 'T') links.push([`${s}${f}3`, `${s}${f}4`]);
  });
  return links;
};

export const getAllLinks = () => [
  ...BODY_STRUCTURE,
  ...getHandLinks('l'),
  ...getHandLinks('r')
];
