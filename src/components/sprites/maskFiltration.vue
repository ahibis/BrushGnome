<script setup>
import { ref, toRef } from "@vue/reactivity";
import {useGameStore} from "@/store/game-store"
import { watch } from "vue";
const gameStore = useGameStore()
const selectedSprite = toRef(gameStore, "selectedSprite");


const fragment = `
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      uniform highp vec4 inputSize;
      uniform vec3 m1;
      uniform vec3 m2;
      uniform vec3 m3;
      uniform float size;
      mat3 mat = mat3(m1,m2,m3);
      void main(void)
      {
        vec2 cord = vTextureCoord;
        vec4 color;
        int i;
        int k;
        for(int i=0;i<3;i+=1){
          vec3 line = mat[i];
          for(int k=0;k<3;k+=1){
            vec2 ncord = vec2(cord.x+inputSize.z*float(i-1)*size,cord.y+inputSize.w*float(k-1)*size);
            color += texture2D(uSampler, ncord) *mat[i][k]  ;
          }
        }
        color.a =1.;
        gl_FragColor = color  ;
      }
      `;

let myFilter;
let Filter = ref();
function spriteUpdate(){
  myFilter = new PIXI.Filter(null, fragment, {
    m1: [0, 0, 0],
    m2: [0, 1, 0],
    m3: [0, 0, 0],
    size: 1,
    test: new Float32Array([1, 2, 3, 4, 5]),
  })
  selectedSprite.value.filters = [myFilter];
  Filter.value = myFilter.uniforms
}
spriteUpdate()
watch(selectedSprite ,spriteUpdate)

function sizeUpdate(e) {
  Filter.filters[0].uniforms.size = +this.size;
}

</script>

<template>
<div>
  <input type="range" min="0.5" max="3" step="0.1" v-model="Filter.size" /><br />
  <input type="number" v-model="Filter.m1[0]" /><input
    type="number"
    v-model="Filter.m1[1]"
  /><input type="number" v-model="Filter.m1[2]" /><br />
  <input type="number" v-model="Filter.m2[0]" /><input
    type="number"
    v-model="Filter.m2[1]"
  /><input type="number" v-model="Filter.m2[2]" /><br />
  <input type="number" v-model="Filter.m3[0]" /><input
    type="number"
    v-model="Filter.m3[1]"
  /><input type="number" v-model="Filter.m3[2]" /><br />
</div>
</template> 
<style>
input[type="number"]{
  width:70px
}
</style>