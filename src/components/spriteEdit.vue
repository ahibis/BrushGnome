<script setup>
import { reactive, ref } from "@vue/reactivity";
import Params from "./sprites/params.vue";
import GradientTransformation from "./sprites/gradientTransformation.vue";
import GradientTransformationOld from "./sprites/gradientTransformationOld.vue";
import MaskFiltration from "./sprites/maskFiltration.vue";
import Binarization from "./sprites/binarization.vue";

let { selectedSprite } = defineProps(["selectedSprite"]);
const window = ref(0);
const windows = reactive([
  {
    title: "params",
    value: 0,
  },
  {
    title: "gradient transformations",
    value: 1,
  },
  {
    title: "gradient transformations faster",
    value: 2,
  },
  {
    title: "mask filtration",
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
          <img
            style="width: 100%"
            :src="selectedSprite.texture.textureCacheIds[0]"
            v-if="selectedSprite.texture"
          />
        </v-col>
      </v-row>
      <v-select label="window" :items="windows" v-model="window" hide-details />
      <v-divider style="margin: 10px 0px" />
      <params v-if="window == 0" :selectedSprite="selectedSprite" />
      <gradient-transformation
        v-else-if="window == 1"
        :selectedSprite="selectedSprite"
      />
      <gradient-transformation-old
        v-else-if="window == 2"
        :selectedSprite="selectedSprite"
      />
      <mask-filtration
      v-else-if="window == 3"
      :selectedSprite="selectedSprite"
      />
      <binarization 
      v-else-if="window == 4"
      :selectedSprite="selectedSprite"
      />
    </v-card-text>
  </v-card>
</template>