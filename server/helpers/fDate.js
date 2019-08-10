// Formatting Time and Date to a human readable format

const humanize = (stime) => {
  let time_structure = stime.split(' ');
  time_structure.splice(5);
  const [d, m, dt, y, ...other] = time_structure;
  time_structure = `${d} ${m}-${dt}-${y} ${other}`
  return time_structure;
};

export default humanize;
