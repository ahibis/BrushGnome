<script setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import Params from "./sprites/params.vue";
import GradientTransformation from "./sprites/gradientTransformation.vue";
import GradientTransformationOld from "./sprites/gradientTransformationOld.vue";
import MaskFiltration from "./sprites/maskFiltration.vue";
import Binarization from "./sprites/binarization.vue";

import { useGameStore } from "@/store/game-store"
import VueWinBox from 'vue-winbox'

const gameStore = useGameStore()
const { selectedSprite, drawer,isEditor,isList } = toRefs(gameStore);

const refs = [ref(),ref(),ref(),ref(),ref()]
onMounted(()=>{
  refs.map(ref=>ref.value?.winbox?.close())
})

const switchDrawer = () => drawer.value = !!(1 - drawer.value);

const switchBox = i=>{
  const box = refs[i]?.value
  if(!box) return;
  if(i==0){
    if(!box.initialized) box.initialize()
    return
  }
  if(selectedSprite.value?.type != "sprite") return;
  if(box.initialized) box.winbox?.close()
  return box.initialize();
}
const options = reactive([
  { title: "download", func: ()=>engine.downImg() },
  { title: "editor toggle", func: ()=>isEditor.value = !isEditor.value },
  { title: "sprite list toggle", func: ()=>isList.value = !isList.value }
]);

const run = (item) => item.func && item.func()

const windows = reactive([
  "params",
  "curves",
  "curves fast",
  "mask filtration",
  "binarization"
])

</script>

<template>
  <v-app-bar extension-height="40">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="switchDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> options </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in options" :key="index" :value="item" @click="run(item)">
            <v-list-item-title >{{
                item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> windows </v-btn>
        </template>
        <v-list >
          <v-list-item v-for="(item, index) in windows" :key="index" :value="item" @click="switchBox(index)">
            <v-list-item-title >
              {{item}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-title>
    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
    </template>
  </v-app-bar>
  <vue-win-box :options="{ title: 'params', class: 'modern', height: '500px', width:'300px' }" :ref="refs[0]">
    <params />
  </vue-win-box>

<vue-win-box :options="{ title: 'curves', class: 'modern', height: '600px', width:'300px' }" :ref="refs[1]">
    <gradient-transformation />
  </vue-win-box>
  <vue-win-box :options="{ title: 'curves fast', class: 'modern', height: '600px', width:'300px' }" :ref="refs[2]">
    <gradient-transformation-old />
  </vue-win-box>
  <vue-win-box :options="{ title: 'masks filtration', class: 'modern', height: '300px', width:'300px' }" :ref="refs[3]">
    <mask-filtration />
  </vue-win-box>
  <vue-win-box :options="{ title: 'binarization', class: 'modern', height: '500px', width:'300px' }" :ref="refs[4]">
    <binarization />
  </vue-win-box>

  
</template>
<style>
.modern {
  z-index: 2000 !important;
}
.modern .wb-body{
  overflow-x: hidden !important;;
}
</style>