export function currencyIDR(value: number) {
  return `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(Number(value))}`;
}

export function currencyDollar(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value));
}
