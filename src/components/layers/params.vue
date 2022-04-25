<script setup>
import { computed } from "@vue/runtime-core";

let { selectedSprite } = defineProps(["selectedSprite"]);
const { room } = engine;
const alpha = computed({
  get: () => room.alpha,
  set: (v) => (room.alpha = v),
});
const width = computed({
  get: () => room.width,
  set: (v) => (room.width = v),
});
const height = computed({
  get: () => room.height,
  set: (v) => (room.height = v),
});
</script>

<template>
  <v-text-field label="name" v-model="selectedSprite.Name" hide-details />
  <v-row>
    <v-col xs="1" sm="3"> alpha </v-col>
    <v-col>
      <input
        type="range"
        max="1"
        min="0"
        step="0.05"
        color="blue"
        v-model="alpha"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> width </v-col>
    <v-col>
      <input
        type="range"
        min="0"
        max="1080"
        step="5"
        color="blue"
        v-model="width"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="3"> height </v-col>
    <v-col>
      <input
        type="range"
        min="0"
        max="1080"
        step="5"
        color="blue"
        thumb-label
        v-model="height"
      />
    </v-col>
  </v-row>
</template>