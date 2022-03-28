<script>
import "./assets/main.scss";
import { Engine, Img } from "./assets/engine";

export default {
  data() {
    return {
      imgs: [],
      modes: [
        "сумма",
        "среднее",
        "произведение",
        "максимум",
        "минимум",
        "маска",
        "наложение",
      ],
      canals: ["RGB", "R", "G", "B", "RG", "RB", "GB"],
      canal: "RGB",
    };
  },
  methods: {
    addFile(e) {
      console.log(e);
      const files = e.target.files;
      for (let file of files) {
        const src = URL.createObjectURL(file);
        console.log(src);
        this.imgs.push(new Img(src));
      }
      this.useMode().then();
    },
    async useMode() {
      await engine.useMode();
      
    },
    imgHandler() {
      const [src1, src2] = this.imgs;
    },
    async deleteImg(i) {
      this.imgs.splice(i, 1);
      await this.useMode();
    },
    download() {
      engine.downImg();
    },
  },
  mounted() {
    engine = new Engine(document.getElementById("window"), this.imgs);
    this.engine = engine;
    vm = this;
  },
  computed: {},
};
</script>

<template>
  <div class="between">
    <div class="left">
      <canvas id="window"></canvas>
      <button class="btn btn-primary" @click="download">
        сохранить картинку
      </button>
      канал
      <select v-model="canal" @change="useMode()">
        <option :value="e" v-for="e in canals" :key="e">{{ e }}</option>
      </select>
      <canvas id="hist"></canvas>
    </div>
    <div class="right">
      <div v-for="(img, i) in imgs" :key="i">
        <img :src="img.src" />
        <select v-model="img.mode" @change="useMode()">
          <option v-for="(mode, k) in modes" :value="k" :key="k">
            {{ mode }}
          </option>
        </select>
        прозрачность
        <input
          type="range"
          max="1"
          min="0"
          step="0.05"
          v-model="img.opacity"
          @change="useMode()"
        />{{ img.opacity * 100 }}%<br> 
        размер<input
          type="range"
          min="0"
          max="1080"
          step="5"
          v-model="img.width"
          @change="useMode()"
        />
        <button class="btn btn-danger" @click="deleteImg(i)">x</button>
      </div>

      <input
        type="file"
        @change="addFile"
        multiple
        accept=".png,.jpg,.jpeg"
        id="drop"
      />
    </div>
  </div>
</template>

<style lang="scss">
#drop {
  background-color: azure;
  width: 100%;
  height: 20vw;
  border: 1px solid black;
}
.left {
  width: 80vw;
  canvas {
    width: 100%;
  }
}
.right {
  width: 20vw;
  img {
    width: 100%;
  }
}
</style>
