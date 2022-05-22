<script setup>
import { reactive, ref, toRef } from "@vue/reactivity";
import Params from "./sprites/params.vue";
import GradientTransformation from "./sprites/gradientTransformation.vue";
import GradientTransformationOld from "./sprites/gradientTransformationOld.vue";
import MaskFiltration from "./sprites/maskFiltration.vue";
import Binarization from "./sprites/binarization.vue";

import { useGameStore } from "@/store/game-store"
import { watch } from "vue";
const gameStore = useGameStore()
const selectedSprite = toRef(gameStore, "selectedSprite");

const window = ref(0);
watch(selectedSprite,()=>{
  const buf = window.value
  window.value = 0
  window.value = buf
})
const windows = reactive([
  {
    title: "Params",
    value: 0,
  },
  {
    title: "Curves",
    value: 1,
  },
  {
    title: "Curves faster",
    value: 2,
  },
  {
    title: "Mask filtration",
    value: 3,
  },
  {
    title: "Binarization",
    value: 4,
  },
]);
</script>

<template>
  <v-card v-if="selectedSprite">
    <v-card-text>
      <v-row justify="center">
        <v-col sm="8">
          <img style="width: 100%" :src="selectedSprite.texture.textureCacheIds[0]" v-if="selectedSprite.texture" />
        </v-col>
      </v-row>
      <v-select label="window" :items="windows" v-model="window" hide-details />
      <v-divider style="margin: 10px 0px" />
      <params v-if="window == 0" />
      <gradient-transformation v-else-if="window == 1" />
      <gradient-transformation-old v-else-if="window == 2" />
      <mask-filtration v-else-if="window == 3" />
      <binarization v-else-if="window == 4" />
    </v-card-text>
  </v-card>
</template>