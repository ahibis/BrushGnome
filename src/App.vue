<script>
import "./assets/main.scss";
import { Engine, Img } from "./assets/engine";

import spriteEdit from "@/components/spriteEdit.vue";
import spriteList from "@/components/spriteList.vue";
import LayerEdit from "@/components/layerEdit.vue";
import bar from "@/components/bar.vue";
import Histogram from "./components/histogram.vue";
const zeroes = _.map(_.range(256), (e) => 0);
export default {
  components: { spriteList, spriteEdit, LayerEdit, bar, Histogram },
  data() {
    return {
      imgs: [],
      selectedSprite: undefined,
      histogramData: [zeroes, zeroes, zeroes, zeroes],
    };
  },
  methods: {
    selectSprite(sprite) {
      this.selectedSprite = sprite;
    },
    drawHistogram() {
      this.histogramData = engine.histogram();
    },
  },
  mounted() {
    engine = new Engine(document.getElementById("window"), this.imgs);
    this.engine = engine;
    vm = this;
  },
};
</script>

<template>
  <v-app>
    <bar @drawHistogram="drawHistogram" />
    <v-main>
      <v-row>
        <v-col sm="8">
          <div id="window"></div>
          <v-col md="8">
            <histogram :data="histogramData" />
          </v-col>
          
        </v-col>
        <v-col sm="4">
          <layer-edit
            :selectedSprite="selectedSprite"
            v-if="selectedSprite?.type == 'layer'"
          />
          <sprite-edit :selectedSprite="selectedSprite" v-else />
          <sprite-list
            :sprites="imgs"
            @selectSprite="selectSprite"
            :selectedSprite="selectedSprite"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#window canvas {
  width: 100%;
}
</style>
