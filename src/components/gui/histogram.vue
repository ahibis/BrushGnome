<script setup>
import { Line,Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement,PointElement, CategoryScale, LinearScale, LineElement } from 'chart.js'

import { reactive, ref, toRef, toRefs } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  BarElement, 
  LineElement,
  PointElement
);

const props = defineProps({
  chartId: {
    type: String,
    default: "bar-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  plugins: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [
      _.map(_.range(256), (e) => 0),
      _.map(_.range(256), (e) => 0),
      _.map(_.range(256), (e) => 0),
      _.map(_.range(256), (e) => 0),
    ],
  },
});
const chartData = computed((v) => {
  return {
    labels: _.range(256),
    datasets: [
      { data: props.data[0], backgroundColor: "#F44336", label: "red" },
      { data: props.data[1], backgroundColor: "#4CAF50", label: "green" },
      { data: props.data[2], backgroundColor: "#2196F3", label: "blue" },
      {
        data: props.data[3].map((e) => ~~(e / 4)),
        backgroundColor: "	#C0C0C0",
        label: "multiply",
      },
    ],
  };
});

const chartOptions = reactive({
  responsive: true
});
</script>
<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>