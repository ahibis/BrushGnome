
<script setup>
import { onMounted } from "@vue/runtime-core";
const { selectedSprite } = defineProps(["selectedSprite"]);
let Canvas;
onMounted(async e => {
  const src = selectedSprite.texture.textureCacheIds[0]
  const img = await engine.loadImg(src)
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
  let kernal = gpu.createKernel(
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
    kernal(img, res);
  }
  const spline = document.getElementById("newSpline");
  const newton = new Newton(
    [[0,0],[255,255],[128,100]],
    spline
  )
  newton.onUpdate = update
  update()
});
function savePicture() {
  let src = Canvas.toDataURL()
  let image = new Image
  selectedSprite.texture.baseTexture = new PIXI.BaseTexture(Canvas);
}
</script>

<template>
  <v-row justify="center">
    <canvas id="newSpline" width="256" height="256" style="width: 100%"></canvas>
    <canvas id="cnv" style="width: 100%" />
  </v-row>
  <v-btn icon color="primary" @click="savePicture()">
    <v-icon>mdi-content-save</v-icon>
  </v-btn>
</template>