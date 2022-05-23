export default function Otsu(pixels,img) {
  let { width: w, height: h } = img;
  let sum = 0;
  let colorsCount = (new Array(256)).fill(0)
  for (let i = 0; i < pixels.length; i += 1) {
    if (i % 4 < 3) colorsCount[pixels[i]] += 1
  }
  colorsCount = colorsCount.map(e => e / (3 * w * h))
  const mt = colorsCount.reduce((ans, v, i) => ans + v * i, 0)
  let max = 0
  let maxT = 0
  for (let t = 0; t < colorsCount.length; t++) {
    const colorsCountT = colorsCount.slice(0, t)
    const w1 = colorsCountT.reduce((ans, e) => ans + e, 0)
    const w2 = 1 - w1
    const m1 = colorsCountT.reduce((ans, v, i) => ans + v * i, 0) / w1
    const m2 = (mt - m1 * w1) / w2
    const sigma = w1 * w2 * ((m1 - m2) ** 2)
    if (sigma > max) {
      max = sigma
      maxT = t
    }
  }
  let newPixels = new Float32Array(pixels.length)
  let s = 0;
  let f = 0;
  for (let i = 0; i < pixels.length; i += 1) {
    const pixel = pixels[i];
    if (i % 4 == 3) newPixels[i] = pixel;
    if (i % 4 == 0) {
      s = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
      if (s <= maxT) f = 0; else f = 255;
      newPixels[i] = f;
      newPixels[i + 1] = f;
      newPixels[i + 2] = f;
    }
  }
  return newPixels;
}