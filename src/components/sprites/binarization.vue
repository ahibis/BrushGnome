<script setup>
import { onMounted } from "@vue/runtime-core";
import { ref, reactive,watch, toRef} from "vue";
import {useGameStore} from "@/store/game-store"
import gavrilov from "./binarization/gavrilov"
import otsu from "./binarization/otsu"
import Niblack from "./binarization/Niblack"
import Sauvola from "./binarization/Sauvola"
import Vulf from "./binarization/Wolf"
import Rote from "./binarization/Bredly Rote"
const gameStore = useGameStore()
const selectedSprite = toRef(gameStore, "selectedSprite");

let src;
let img;
let pixels;
let gpu;
const cnv = ref()

async function spriteUpdate(e){
  src = selectedSprite.value.texture.textureCacheIds[0];
  img = await engine.loadImg(src)
  pixels = await engine.loadPixels(img)
  const { width, height } = img;
  const canvas = cnv.value;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = "100%";
  updateMethod(0)
}
watch(selectedSprite,spriteUpdate)
onMounted(spriteUpdate)

function getNewPixels(v) {
  if (v == 0) return gavrilov(pixels,img)
  if (v == 1) return otsu(pixels,img)
}
const isLocal = ref(false)
function globalMethods(v){
  isLocal.value = false;
  const { width, height } = img;
  const Ctx = cnv.value.getContext("2d");
  let newPixels;
  newPixels = getNewPixels(v);
  const image = new ImageData(
    new Uint8ClampedArray(newPixels),
    width,
    height
  );
  Ctx.putImageData(image, 0, 0);
}
const cnv1 = ref(undefined)
const a = ref(15)
const k = ref(-0.2)
function localMethods(v){
  const { width, height } = img;
  if(!gpu){
    const canvasLocal = cnv1.value;
    canvasLocal.width = width;
    canvasLocal.height = height;
    canvasLocal.style.width = "100%";
    const gl = canvasLocal.getContext("webgl2", { premultipliedAlpha: false });
    gpu = new GPU({
      canvas: canvasLocal,
      context: gl,
      //mode: 'dev'
    });
    isLocal.value = true
  }
  if(v==2) Niblack(gpu, img, a.value, k.value)
  if(v==3) Sauvola(gpu, img, a.value, k.value)
  if(v==4) Vulf(gpu, img, a.value, k.value)
  if(v==5) Rote(gpu, img, a.value, k.value)
}

function updateMethod(v) {
  if(v<2) return globalMethods(v);
  localMethods(v)
  
}

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
  {
    title: "Niblack",
    value: 2,
  },
  {
    title: "Sauvola",
    value: 3,
  },
  {
    title: "Wolf",
    value: 4,
  },
  {
    title: "Bradley",
    value: 5,
  },
]);

</script>
<template>
  <v-select @update:modelValue="updateMethod" label="methods" :items="types" v-model="method" />
  <v-row justify="center" v-show="!isLocal">
    <canvas ref="cnv" />
  </v-row>
  <v-row justify="center" v-show="isLocal">
    <canvas ref="cnv1" />
    <v-text-field v-model="a" step="1" @update:model-value="updateMethod(method)" label="размер" type="number" hide-details="auto"/>
    <v-text-field v-model="k" step="0.1" @update:model-value="updateMethod(method)" label="коэффициент" type="number" hide-details="auto"/>
  </v-row>
</template>