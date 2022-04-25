async function srcToImg(src){

}
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
export class Container extends PIXI.Container {
  Name = "layer";
  type = "layer";
  get r() {
    let color = (this.tint & 0xff0000) / 0x10000;
    return (this.tint & 0xff0000) / 0x10000;
  }
  set r(v) {
    let color = (v % 256) * 0x010000 + (0x00ffff & this.tint);
    this.tint = color;
  }
  get g() {
    return (this.tint & 0x00ff00) / 0x100;
  }
  set g(v) {
    this.tint = (v % 256) * 0x100 + (0xff00ff & this.tint);
  }
  get b() {
    return this.tint & 0x0000ff;
  }
  set b(v) {
    this.tint = (v % 256) + (0xffff00 & this.tint);
  }
}
export class Img extends PIXI.Sprite {
  Name = "picture";
  type = "sprite";
  get r() {
    let color = (this.tint & 0xff0000) / 0x10000;
    return (this.tint & 0xff0000) / 0x10000;
  }
  set r(v) {
    let color = (v % 256) * 0x010000 + (0x00ffff & this.tint);
    this.tint = color;
  }
  get g() {
    return (this.tint & 0x00ff00) / 0x100;
  }
  set g(v) {
    this.tint = (v % 256) * 0x100 + (0xff00ff & this.tint);
  }
  get b() {
    return this.tint & 0x0000ff;
  }
  set b(v) {
    this.tint = (v % 256) + (0xffff00 & this.tint);
  }
  pixels(){
    const src = this.texture.textureCacheIds[0]
    const img = new Img();
    img.src = src;
    img.onload = function(){

    }
  }
}
export class Engine {
  sprites = [];
  textures = [];
  width = 1080;
  height = 768;
  ctx = undefined;
  view = undefined;
  app = undefined;
  room = undefined;
  extract;
  _sprites = 0;
  constructor(el, imgs) {
    this.sprites = imgs;
    const app = new PIXI.Application({
      width: this.width,
      height: this.height,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
      //context: 'webgl2'
    });
    this.extract = app.renderer.extract;
    this.app = app;
    this.view = app.view;

    const { stage } = app;
    this.stage = stage;
    const room = new Container();
    room.Name = "Main layer";
    room.id = 0;
    stage.addChild(room);
    this.room = room;
    imgs.push({
      Name: "Main layer",
      type: "layer",
      id: 0,
    });
    this.ctx = this.view.getContext("webgl2");
    el.appendChild(app.view);
  }
  loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = (data) => {
        resolve(img);
      };
    });
  }
  pixels(){
    return this.extract.pixels(this.app.stage);
  }
  pixelsToHistogram(pixels){
    const zeros = _.map(_.range(256),e=>0)
    let res = [zeros.slice(),zeros.slice(),zeros.slice(),zeros.slice()]
    let color;
    for(let i=0;i<pixels.length;i+=1){
      if(i%4==3) continue;
      if(~~(i/4)*4+3 == 0) continue;
      color = pixels[i];
      res[i%4][color]+=1;
      res[3][color]+=1;
    }
    return res;
  }
  histogram(){
    const pixels = this.pixels();
    return this.pixelsToHistogram(pixels);
  }
  saveFile(src,name="outImg") {
    let link = document.createElement("a");
    link.setAttribute("href", src);
    link.setAttribute("download", name);
    link.click();
  }
  downImg() {
    const img = this.extract.image(this.app.stage);
    this.saveFile(img.src);
  }
  addSprite(src) {
    const { textures, sprites, room } = this;
    const texture = PIXI.Texture.from(src);
    textures.push(texture);
    this._sprites += 1;
    const sprite = new Img(texture);
    sprite.id = this._sprites;
    sprites.push(sprite);
    room.addChild(sprite);
  }
}
