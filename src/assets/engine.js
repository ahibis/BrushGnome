export class Text {
  constructor(text = "", x = 0, y = 0) {
    //this.fillStyle = "#263871";
    this.fillStyle = "#FFFFFF";
    this.textBaseline = "top";
    this.size = 50;
    this.font = "Impact";
    this.x = x;
    this.y = y;
    this.text = text;
    this.type = "text";
  }
  get width() {
    return this.size * this.text.length;
  }
  async draw(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.textBaseline = "top";
    ctx.font = `${this.size}px ${this.font}`;
    ctx.fillText(this.text, this.x, this.y);
  }
}
export class Img {
  loadImg(src) {
    if (src == this._src) if (this._img) return this._img;
    let me = this;
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      //img.width=me.width;
      me._src = src;
      this._img = img;
      img.onload = (data) => {
        resolve(img);
      };
    });
  }
  constructor(src = "", x = 0, y = 0, width = 0) {
    this.x = x;
    this.y = y;
    this.src = src;
    this.mode = 0;
    this.type = "Image";
    this.name = "test";
    this.width = width;
    this.imgWidth = 100;
    this.imgHeight = 100;
    this.opacity = 1;
    this.height = 100;
    this._img = null;
    this._src = null;
    this.pixels = null;
    this.lastWidth = null;
    let me = this;
  }
  async getHeight() {
    let img = await this.loadImg(this.src);
    this.imgWidth = img.width;
    this.imgHeight = img.height;
    if (this.width == 0) this.width = this.imgWidth;
    if (this.width > engine.width) this.width = engine.width;
    this.height = (this.width * img.height) / img.width;
    return this.height;
  }
  async draw(ctx) {
    this._img = await this.loadImg(this.src);
    let img = this._img;
    await this.getHeight();
    ctx.drawImage(
      this._img,
      this.x,
      this.y,
      this.width,
      (this.width * img.height) / img.width
    );
  }
  async getData() {
    const canvas = document.createElement("canvas");
    const { width, height } = engine;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    await this.draw(ctx);
    let pixels = await ctx.getImageData(0, 0, width, height).data;
    this.pixels = pixels;
    return pixels;
  }
  async getDataWithOptions() {
    let pixels;
    // if (this.pixels && (this.lastWidth == this.width)) {
    //   pixels = this.pixels;
    // } else {
      pixels = await this.getData();
    //}
    this.lastWidth = this.width;
    if (this.opacity < 0.95 || vm.canal != "RGB") {
      const [t1,t2,t3] = [!/R/.test(vm.canal), !/G/.test(vm.canal),!/B/.test(vm.canal)]
      pixels = pixels.map((e, i) => {
        let os = i % 4;
        if (os == 0 && t1) return 0;
        if (os == 1 && t2) return 0;
        if (os == 2 && t3) return 0;
        if (this.opacity < 0.95) return ~~(e * this.opacity);
        return e;
      });
    }
    return pixels;
  }
  async useMode(pixels) {
    const { mode } = this;
    let myPixels = await this.getDataWithOptions();

    if (mode == 0) {
      return pixels.map((e, i) => {
        let color = e + myPixels[i];
        if (color > 255) color = 255;
        return color;
      });
    }
    if (mode == 1) {
      return pixels.map((e, i) => {
        return ~~((e + myPixels[i]) / 2);
      });
    }
    if (mode == 2) {
      return pixels.map((e, i) => {
        return ~~((e * myPixels[i]) / 256);
      });
    }
    if (mode == 3) {
      return pixels.map((e, i) => {
        return max(e, myPixels[i]);
      });
    }
    if (mode == 4) {
      return pixels.map((e, i) => {
        return min(e, myPixels[i]);
      });
    }
    if (mode == 5) {
      return pixels.map((e, i) => {
        if (i % 4 != 3) return e;
        return myPixels[i];
      });
    }
    if (mode == 6) {
      return pixels.map((e, i) => {
        return myPixels[i];
      });
    }
    return pixels;
  }
}
export class Engine {
  imgs = [];
  el = undefined;
  width = 1080;
  height = 768;
  ctx;
  constructor(el, imgs) {
    [this.el, this.imgs] = [el, imgs];
    this.ctx = el.getContext("2d");
    el.width = this.width;
    el.height = this.height;
  }
  canvasToImg(ctx) {
    let src = ctx.toDataURL();
    let img = new Image();
    img.src = src;
    return img;
  }
  saveImage(image) {
    let link = document.createElement("a");
    link.setAttribute("href", image.src);
    link.setAttribute("download", "outImg");
    link.click();
  }
  downImg() {
    this.saveImage(this.canvasToImg(this.el));
  }
  async drawHist() {
    const Ctx = document.getElementById("hist").getContext("2d");
    const {ctx,width, height} = this;
    let pixels = await ctx.getImageData(0, 0, width, height).data;
    let labels = [..._.range(0,256)];
    let res=labels.map(e=>0)
    for(let i in pixels) {
      if(i%4==3) continue;
      res[pixels[i]] +=1
    }
    res[0] = 0;
    const chart = new Chart(Ctx, {
      type: "bar",
      data: {
        labels ,
        datasets: [
          {
            label: "Histogram",
            data: res,
            backgroundColor: "green",
          },
        ],
      },
      options: {
      }
    });
  }
  async useMode() {
    const { width, height, ctx } = this;
    if (this.imgs.length < 1) {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    const [img, ...other] = this.imgs;
    let pixels = await img.getDataWithOptions();
    for (let e of other) {
      pixels = await e.useMode(pixels);
    }
    let image = new ImageData(pixels, width, height);
    ctx.putImageData(image, 0, 0);
  }
}
