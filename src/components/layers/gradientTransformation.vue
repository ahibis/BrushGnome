<script setup>
import { reactive, ref } from "@vue/reactivity";
import Histogram from "../gui/histogram.vue";
const zeroes = _.map(_.range(256), (e) => 0);
let { selectedSprite } = defineProps(["selectedSprite"]);
const histogramData = ref([zeroes, zeroes, zeroes, zeroes]) 
function updateHistogram() {
    histogramData.value = reactive(engine.histogram());
}
</script>
<template>
    <Histogram :data="histogramData" />
    <v-btn color="green" @click="updateHistogram">update histogram</v-btn>
</template>