<script setup>
import { reactive, ref } from "@vue/reactivity";

let { selectedSprite } = defineProps(["selectedSprite"]);
const modes = reactive([
  {
    title: "normal",
    value: PIXI.BLEND_MODES.NORMAL,
  },
  {
    title: "add",
    value: PIXI.BLEND_MODES.ADD,
  },
  {
    title: "multiply",
    value: PIXI.BLEND_MODES.MULTIPLY,
  },
  {
    title: "average",
    value: PIXI.BLEND_MODES.SCREEN,
  },
]);
</script>

<template>
  <v-text-field label="name" v-model="selectedSprite.Name" hide-details />
  <v-select
    label="blend mode"
    :items="modes"
    v-model="selectedSprite.blendMode"
    hide-details
  />
  <v-row>
    <v-col sm="3"> width </v-col>
    <v-col>
      <v-slider
        min="0"
        max="1080"
        step="5"
        thumb-label
        hide-details="auto"
        color="blue"
        v-model="selectedSprite.width"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> height </v-col>
    <v-col
      ><v-slider
        min="0"
        max="1080"
        step="5"
        thumb-label
        color="blue"
        hide-details="auto"
        v-model="selectedSprite.height"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> red </v-col>
    <v-col>
      <v-slider
        min="0"
        max="255"
        step="5"
        thumb-label
        color="red"
        hide-details="auto"
        v-model="selectedSprite.r"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> green </v-col>
    <v-col>
      <v-slider
        min="0"
        max="255"
        step="5"
        thumb-label
        color="green"
        hide-details="auto"
        v-model="selectedSprite.g"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> blue </v-col>
    <v-col>
      <v-slider
        min="0"
        max="255"
        step="5"
        thumb-label
        color="blue"
        hide-details="auto"
        v-model="selectedSprite.b"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col xs="1" sm="3"> alpha </v-col>
    <v-col>
      <v-slider
        hide-details="auto"
        max="1"
        min="0"
        step="0.05"
        color="blue"
        thumb-label
        v-model="selectedSprite.alpha"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> x </v-col>
    <v-col>
      <v-slider
        min="0"
        max="1080"
        step="5"
        thumb-label
        color="blue"
        hide-details="auto"
        v-model="selectedSprite.x"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> y </v-col>
    <v-col>
      <v-slider
        min="0"
        max="1080"
        step="5"
        thumb-label
        color="blue"
        hide-details="auto"
        v-model="selectedSprite.y"
      />
    </v-col>
  </v-row>
</template>