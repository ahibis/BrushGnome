<script setup>
import "./assets/main.scss";
import { Engine, Img } from "./assets/engine";
import { ref, onMounted, toRefs, watch } from "vue";
import spriteEdit from "@/components/spriteEdit.vue";
import spriteList from "@/components/spriteList.vue";
import LayerEdit from "@/components/layerEdit.vue";
import bar from "@/components/bar.vue";
import {useGameStore} from "@/store/game-store"

const gameStore = useGameStore()
const {sprites} = gameStore;
const {selectedSprite,drawer,isEditor,isList} = toRefs(gameStore);
watch(gameStore,()=>{
  const {isEditor,isList} = gameStore;
  const cash={
    isEditor,
    isList
  }
  localStorage.appCash = JSON.stringify(cash);
})

onMounted(() => {
  if(localStorage.appCash){
    const cash = JSON.parse(localStorage.appCash)
    for(let key in cash){
      gameStore[key] = cash[key]
    }
  }
  engine = new Engine(document.getElementById("window"), sprites);
  vm = this;
})
</script>

<template>
  <v-app>
    <bar />
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <sprite-list/>
    </v-navigation-drawer>
    <v-main>
      <v-row>
        <v-col :sm="isEditor || isList?8:12" cols="12">
          <div id="window"></div>
        </v-col>
        <v-col sm="4" style="height:96vh;overflow-y:auto" v-if="isEditor || isList">
          <template v-if="isEditor">
            <layer-edit  v-if="selectedSprite?.type == 'layer'" />
            <sprite-edit v-else />
          </template>
          <sprite-list v-if="isList"/>
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
