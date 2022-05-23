export default function gavrilov(pixels,img) {
  let { width: w, height: h } = img;
  let sum = 0;
  for (let i = 0; i < pixels.length; i += 1) {
    sum += pixels[i]
  }
  const t = Number(sum) / pixels.length * 3
  let newPixels = new Float32Array(pixels.length)
  let s = 0;
  let f = 0;
  for (let i = 0; i < pixels.length; i += 1) {
    const pixel = pixels[i];
    if (i % 4 == 3) newPixels[i] = pixel;
    if (i % 4 == 0) {
      s = pixels[i] + pixels[i + 1] + pixels[i + 2]
      if (s <= t) f = 0; else f = 255;
      newPixels[i] = f;
      newPixels[i + 1] = f;
      newPixels[i + 2] = f;
    }
  }
  return newPixels;
}