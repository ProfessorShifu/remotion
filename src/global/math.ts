export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

export const smoothStep = (t: number): number => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
