
<script setup>
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import histogram from "../gui/histogram.vue";
//import histogramNew from "../gui/histogramNew.vue";
const { selectedSprite } = defineProps(["selectedSprite"]);
let Canvas;
const histogramData = ref([0,0,0,0])
let img;
let kernel;
let newPixels;
onMounted(async e => {
  const src = selectedSprite.texture.textureCacheIds[0]
  img = await engine.loadImg(src)
  Canvas = document.getElementById("cnv")
  Canvas.width = 640;
  Canvas.height = 640;
  Canvas.style.width = "100%";

  const gl = Canvas.getContext("webgl2", { premultipliedAlpha: false });
  //const gl = Canvas.getContext("2d");
  const gpu = new GPU({
    canvas: Canvas,
    context: gl,
  });
  let w = 640;
  let h = 640;
  kernel = gpu.createKernel(
    function (image, list) {
      const pixel = image[this.thread.y][this.thread.x];
      this.color(list[Math.floor(pixel[0] * 256)], list[Math.floor(pixel[1] * 256)], list[Math.floor(pixel[2] * 256)], pixel[3]);

    },
    { output: [w, h], graphical: true }
  );
  let res = _.map(_.range(256), (e) => 0);
  function update() {
    let t1 = new Date().getTime();
    for (let i = 0; i < 256; i += 1) {
      let a = newton.get(i);
      res[i] = a / 256;
    }
    let t2 = new Date().getTime();
    //console.log(res);
    kernel(img, res);
    newPixels = kernel.getPixels()
    //histogramData.value = engine.pixelsToHistogram()
  }
  const spline = document.getElementById("newSpline");
  const newton = new Newton(
    [[0,0],[256,256],[128,100]],
    spline
  )
  newton.onUpdate = update
  update()
});
function savePicture() {
  const {width,height} = img;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const image = new ImageData(
      new Uint8ClampedArray(newPixels),
      width,
      height
    );
  ctx.putImageData(image, 0, 0);

  let src = canvas.toDataURL()
  selectedSprite.texture.baseTexture = new PIXI.BaseTexture(src);
}
</script>

<template>
  <v-row justify="center">
    <canvas id="newSpline" width="256" height="256" style="width: 100%"></canvas>
    <canvas id="cnv" style="width: 100%" />
  </v-row>
  <!-- <histogram :data="histogramData" /> -->
  
  <v-btn icon color="primary" @click="savePicture()">
    <v-icon>mdi-content-save</v-icon>
  </v-btn>
</template>