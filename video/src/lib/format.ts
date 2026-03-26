export function formatDollarK(v: number): string {
  return `$${Math.round(v / 1000)}k`;
}

export function formatMillions(thousandsK: number): string {
  return `${Math.round(thousandsK / 1000)}M`;
}

export function formatDollarRange(lo: number, hi: number): string {
  return `${formatDollarK(lo)}\u2013${formatDollarK(hi)}`;
}
