<script>
import "./assets/main.scss";
import { Engine, Img } from "./assets/engine";

import spriteEdit from "@/components/spriteEdit.vue";
import spriteList from "@/components/spriteList.vue";
import LayerEdit from "@/components/layerEdit.vue";
import bar from "@/components/bar.vue";
import Histogram from "./components/gui/histogram.vue";

export default {
  components: { spriteList, spriteEdit, LayerEdit, bar, Histogram },
  data() {
    return {
      imgs: [],
      selectedSprite: undefined,
      drawer: false,
    };
  },
  methods: {
    selectSprite(sprite) {
      this.selectedSprite = sprite;
      this.drawer = false;
    },
    switchDrawer() {
      this.drawer = !!(1 - this.drawer);
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
    <bar @switchDrawer="switchDrawer" />
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <sprite-list
        :sprites="imgs"
        @selectSprite="selectSprite"
        :selectedSprite="selectedSprite"
      />
    </v-navigation-drawer>
    <v-main>
      <v-row>
        <v-col sm="8">
          <div id="window"></div>
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
