// Composições vetoriais originais para a prova de conceito; não são obras da artista.
const escapeXml = value => String(value ?? '').replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character]));

export function artSvg(kind = 'forest', title = 'Ilustração de demonstração') {
  const palettes = {
    forest: ['#233d34', '#a8b18d', '#dec99c'],
    moon: ['#252e3d', '#9ca8ae', '#ebd7ab'],
    botanical: ['#e6dfce', '#6c8066', '#58694f'],
    stars: ['#776259', '#e2cbb0', '#f3dfb2']
  };
  const [background, ink, accent] = Object.hasOwn(palettes, kind) ? palettes[kind] : palettes.forest;
  const leaves = Array.from({ length: 7 }, (_, index) => {
    const y = 360 - index * 31;
    return `<path d="M199 ${y} Q142 ${y - 58} 129 ${y - 34} Q142 ${y + 3} 199 ${y}" fill="${ink}"/><path d="M201 ${y - 13} Q255 ${y - 75} 273 ${y - 50} Q257 ${y - 11} 201 ${y - 13}" fill="${ink}"/>`;
  }).join('');
  const stars = [[76,95],[317,90],[99,203],[307,258],[84,339],[291,365]].map(([x,y], index) => `<path d="M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z" fill="${accent}" opacity="${index % 2 ? '.6' : '.9'}"/>`).join('');
  const center = kind === 'moon'
    ? `<circle cx="200" cy="211" r="82" fill="${accent}"/><circle cx="229" cy="187" r="76" fill="${background}"/><path d="M113 366 Q129 277 157 254 M278 367 Q264 296 241 270" fill="none" stroke="${ink}" stroke-width="3"/><path d="M134 306 Q82 278 101 260 Q135 263 134 306 M259 319 Q306 286 293 270 Q261 278 259 319" fill="${ink}"/>`
    : kind === 'stars'
    ? `<circle cx="200" cy="229" r="104" stroke="${ink}" fill="none" stroke-width="1"/><circle cx="200" cy="229" r="76" stroke="${ink}" fill="none" stroke-width="1"/><path d="M200 128 L224 204 L303 229 L224 253 L200 330 L176 253 L97 229 L176 204Z" fill="${accent}"/><circle cx="200" cy="229" r="25" fill="${background}"/><circle cx="200" cy="229" r="12" fill="${ink}"/>`
    : `<path d="M200 390 Q207 252 195 125" stroke="${accent}" stroke-width="3" fill="none"/>${leaves}<circle cx="200" cy="95" r="23" fill="none" stroke="${accent}" stroke-width="1"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" role="img" aria-label="${escapeXml(title)} — visual demonstrativo"><title>${escapeXml(title)} — ilustração de demonstração</title><rect width="400" height="480" fill="${background}"/><rect x="27" y="27" width="346" height="426" rx="170" fill="none" stroke="${ink}" stroke-width="1" opacity=".5"/>${stars}${center}<path d="M158 420 H242" stroke="${accent}" stroke-width="1"/><circle cx="200" cy="420" r="4" fill="${accent}"/></svg>`;
}
