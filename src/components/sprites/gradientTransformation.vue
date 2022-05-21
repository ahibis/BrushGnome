<script setup>
import Histogram from "../gui/histogram.vue";
import { onMounted, ref } from "@vue/runtime-core";
const { selectedSprite } = defineProps(["selectedSprite"]);
function timer(func, ...args) {
  let t1 = new Date().getTime();
  let res = func(...args);
  let t2 = new Date().getTime();
  let dt = t2 - t1;
  let name = func.name;
  //console.log(`the program ${name} computed: ${dt}ms`);
  return { t1, t2, dt, res, name };
}
async function loadPixels(img) {
  let { width: w, height: h } = img;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  return await ctx.getImageData(0, 0, w, h).data;
}
const zeroes = _.map(_.range(256), (e) => 0);
const histogramData = ref([zeroes, zeroes, zeroes, zeroes]);
const isGPU = ref(false);
const time = ref(0);
let Canvas;
onMounted(async (e) => {
  const src = selectedSprite.texture.baseTexture.cacheId;
  const img = await engine.loadImg(src);
  const pixels = await loadPixels(img);
  const { width, height } = img;
  Canvas = document.getElementById("cnv");
  Canvas.width = width;
  Canvas.height = height;
  Canvas.style.width = "100%";
  const Ctx = Canvas.getContext("2d");
  let res = _.map(_.range(256), (e) => 0);
  const gpu = new GPU();
  const { length } = pixels;
  let kernal = gpu.createKernel(
    function (pixels, list) {
      const pixel = pixels[this.thread.x];
      if (this.thread.x % 4 == 3) return pixel;
      return list[pixel];
    },
    { output: [length], graphical: false }
  );
  function cpuHandler(pixels, list) {
    const newPixels = new Float32Array(pixels.length);
    for (let i = 0; i < pixels.length; i += 1) {
      const pixel = pixels[i];
      if (i % 4 == 3) newPixels[i] = pixel;
      newPixels[i] = list[pixel];
    }
    return newPixels;
  }
  function update() {
    for (let i = 0; i < 256; i += 1) {
      let a = newton.get(i);
      res[i] = Math.floor(a);
    }
    let newPixels;
    if (isGPU.value) {
      newPixels = kernal(pixels, new Float32Array(res));
    } else {
      newPixels = cpuHandler(pixels, res);
    }
    const image = new ImageData(
      new Uint8ClampedArray(newPixels),
      width,
      height
    );
    Ctx.putImageData(image, 0, 0);
    histogramData.value = engine.pixelsToHistogram(newPixels);
  }
  let Time;
  
  const spline = document.getElementById("Spline");
  const newton = new Newton(
    [[0,0],[256,256]],
    spline
  )
  newton.onUpdate = ()=>{
    Time=timer(update);
    time.value = Time.dt
  }
  Time=timer(update);
  time.value = Time.dt

});
function savePicture(){
  let src = Canvas.toDataURL()

  const texture = PIXI.Texture.from(src);
  selectedSprite.texture = texture
  //selectedSprite.texture.baseTexture = new PIXI.BaseTexture(Canvas);
}
</script>

<template>
  <v-row justify="center">
    <canvas id="Spline" width="256" height="256" style="width: 100%"></canvas>
    <canvas id="cnv" />
  </v-row>
  <Histogram :data="histogramData" />
  computed time {{time}}
  <v-row justify="space-around">
    <v-switch label="GPU on" v-model="isGPU" color="green" hide-details=""/>
    <v-btn icon color="primary" @click="savePicture()"><v-icon>mdi-content-save</v-icon></v-btn>
  </v-row>
  
</template>
