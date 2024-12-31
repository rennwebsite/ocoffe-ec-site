export const numberFormat = (x) => {
  if (typeof x !== 'number' || isNaN(x)) {
    return null;
  }
  return x.toLocaleString(undefined, { minimumFractionDigits: 0 });
}
