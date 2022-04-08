// Code from https://gist.github.com/mjackson/5311256
function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hsl2rgba(rawH: number, rawS: number, rawL: number, alpha = 1): string {
  const h = rawH / 360;
  const s = rawS / 110;
  const l = rawL / 85;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1.0 / 3.0);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1.0 / 3.0);
  }

  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

// Code from https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export function randomColor(
  value: string,
  alpha = 1,
  hue = [0, 360],
  lit = [40, 70],
  sat = [75, 90]
): { foreground: string; background: string } {
  const range = function (hash, min, max) {
    const diff = max - min;
    const x = ((hash % diff) + diff) % diff;
    return x + min;
  };

  let hash = 0;
  if (value === undefined || value.length === 0) {
    return { foreground: '#000', background: '#fff' };
  }

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const h = range(hash, hue[0], hue[1]);
  const s = range(hash, sat[0], sat[1]);
  const l = range(hash, lit[0], lit[1]);

  return {
    foreground: hsl2rgba(h, s, l * 0.5, 1),
    background: hsl2rgba(h, s, l * 0.9, alpha)
  };
}
