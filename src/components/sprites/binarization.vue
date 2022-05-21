<script setup>
import { onMounted } from "@vue/runtime-core";
import { ref, reactive } from "vue";
const { selectedSprite } = defineProps(["selectedSprite"]);
const src = selectedSprite.texture.textureCacheIds[0]
let img;
let pixels;
let Canvas;
function gavrilov() {
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
function Otsu() {
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
function getNewPixels(v) {
  if (v == 0) return gavrilov()
  if (v == 1) return Otsu()
}
function updateMethod(v) {
  const { width, height } = img;
  const Ctx = Canvas.getContext("2d");
  let newPixels;
  newPixels = getNewPixels(v);
  const image = new ImageData(
    new Uint8ClampedArray(newPixels),
    width,
    height
  );
  Ctx.putImageData(image, 0, 0);
}
onMounted(async e => {
  img = await engine.loadImg(src)
  pixels = await engine.loadPixels(img)
  const { width, height } = img;
  Canvas = document.getElementById("cnv");
  Canvas.width = width;
  Canvas.height = height;
  Canvas.style.width = "100%";
  updateMethod(0)
})
const method = ref(0)
const types = reactive([
  {
    title: "Gavrilov",
    value: 0,
  },
  {
    title: "Otsu",
    value: 1,
  },
]);

</script>
<template>
  <v-select @update:modelValue="updateMethod" label="methods" :items="types" value="method" />
  <v-row justify="center">
    <canvas id="cnv" />
  </v-row>
</template>