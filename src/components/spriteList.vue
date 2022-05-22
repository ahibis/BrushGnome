<script setup>
import { ref, toRef, toRefs } from "@vue/reactivity";
import {useGameStore} from "@/store/game-store"
const gameStore = useGameStore()
const {sprites} = gameStore;
const {drawer} = toRefs(gameStore);

function selectSprite(sprite) {
  gameStore.selectedSprite= sprite;
  drawer.value = false;
}

function deleteImg(i) {
  const [sprite] = sprites.splice(i, 1);
  const { room } = engine;
  room.children = room.children.filter((e) => e.id != sprite.id);
}

function addSprite(e) {
  const el = document.createElement("input");
  el.type ="file";
  el.multiple = true;
  el.accept=".png,.jpg,.jpeg"
  el.onchange = function(e){
    console.log(e);
    const files = e.target.files;
    for (let file of files) {
      const src = URL.createObjectURL(file);
      const sprite = engine.addSprite(src);
      sprite.on("pointerdown",e=>{
        selectSprite(sprite)
      })
    }
  }
  el.click()
}
function select(sprite){
  props.selectedSprite=sprite
  //sprites.value=[]
}
</script>

<template>
  <h2>List of layers</h2>
  <v-card
    v-for="(sprite, i) in sprites"
    :key="i"
    @click="selectSprite(sprite)"
  >
    <v-card-text>
      <v-row align="center">
        <template v-if="sprite.texture">
          <v-col cols="2" sm="3">
            <img :src="sprite.texture.textureCacheIds[0]" style="width:100%" />
          </v-col>
          <v-col cols="8" sm="6">
            {{ sprite.Name }}
          </v-col>
          <v-col cols="2" sm="3">
            <div>
              <v-btn icon @click="deleteImg(i)" color="red">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-col>
        </template>
        <v-col v-else>
          {{ sprite.Name }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-btn color="green" @click="addSprite"> add picture </v-btn>
</template>