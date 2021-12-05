export function currencyIDR(value: number) {
  return `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(Number(value))}`;
}
