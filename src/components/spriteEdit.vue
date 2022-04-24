<script setup>
import { reactive, ref } from "@vue/reactivity";
import Params from "./windows/params.vue";
import GradientTransformation from "./windows/gradientTransformation.vue";

let { selectedSprite } = defineProps(["selectedSprite"]);
const window = ref(0);
const windows = reactive([
  {
    title: "params",
    value: 0,
  },
  // {
  //   title: "gradient transformations",
  //   value: 1,
  // },
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
      <v-divider style="margin:10px 0px"/>
      <params v-if="window==0" :selectedSprite="selectedSprite"/>
      <gradient-transformation v-else-if="window==1" :selectedSprite="selectedSprite"/>
    </v-card-text>
  </v-card>
</template>