<script setup>
import { reactive } from "@vue/reactivity";

function download() {
  engine.downImg();
}

const emit = defineEmits(["drawHistogram"])
const options = reactive([
  { title: "download", func: download },
  { title: "draw histogram", func: ()=>emit("drawHistogram")},
]);
function run(item) {
  if(item.func){
    item.func()
  }
}
</script>

<template>
  <v-app-bar extension-height="40">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> options </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in options"
            :key="index"
            :value="item"
          >
            <v-list-item-title @click="run(item)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-title>
    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
    </template>
  </v-app-bar>
</template>