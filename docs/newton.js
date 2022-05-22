class Newton {
  dots = [];
  params = [];
  #canvas = undefined;
  onUpdate = ()=>{}
  dotsRequired = 2;
  bounds = true;
  get canvas(){
    return this.#canvas
  }
  set canvas(canvas){
    this.#canvas = canvas
    if(canvas){
      let dot = -1;
      const toNormalCords = (x,y) =>{
        const {clientWidth:cw,clientHeight:ch,width:w,height:h} = canvas
        return [x*w/cw,(1-y/ch)*h]
      }
      canvas.addEventListener("pointerdown",({offsetX:mouseX,offsetY:mouseY})=>{
        [mouseX,mouseY] = toNormalCords(mouseX,mouseY)
        console.log(1)
        this.dots.forEach(([x,y],i)=>{
          if(((x-mouseX)**2+(y-mouseY)**2)<49) {
            console.log("take dot")
            dot = i
          }
        })
        if(dot==-1){
          const x = mouseX;
          const y = this.get(x)
          if(Math.abs(mouseY-y)<5){
            this.addDot([x,y])
            dot = this.dots.length -1
          }
        }
      })
      canvas.addEventListener("pointerup",()=>{
        dot = -1;
      })
      canvas.addEventListener("pointermove",({offsetX:mouseX,offsetY:mouseY})=>{
        if(dot!=-1){
          [mouseX,mouseY] = toNormalCords(mouseX,mouseY)
          this.dots[dot] = [mouseX, mouseY]
          this.solveParams()
        }
      })
      canvas.addEventListener("dblclick",({offsetX:mouseX,offsetY:mouseY})=>{
        [mouseX,mouseY] = toNormalCords(mouseX,mouseY)
        this.dots.forEach(([x,y],i)=>{
          if(((x-mouseX)**2+(y-mouseY)**2)<49) {
            if(this.dots.length>this.dotsRequired){
              dot = -1
              this.dots.splice(i,1)
              this.solveParams()
            }
          }
        })
      })
    }
  }
  get ctx(){
    if(!this.canvas) return undefined;
    return this.canvas.getContext("2d")
  }
  updateImg(){
    if(!this.ctx) return;
    const {ctx,canvas:{width:w,height:h}} = this
    ctx.lineWidth = 2
    ctx.beginPath(); 
    ctx.clearRect(0, 0, w, h)
    for(let i=0;i<w;i+=2){
      const x = i*2;
      if(i==0) ctx.moveTo(x, h-this.get(x));
      else ctx.lineTo(x, h-this.get(x))
    }
    ctx.stroke(); 
    this.dots.map(([x,y])=>{
      ctx.beginPath(); 
      ctx.arc(x, h-y, 5, 0, 2 * Math.PI, false);
      ctx.fill()
    })
    this.onUpdate()
  }
  constructor(dots = [],canvas = undefined) {
    this.dots = dots;
    this.canvas = canvas;
    this.solveParams();
  }
  solveParams() {
    const { dots } = this;
    this.params = dots.map((e, k) => {
      let c = e[1];
      for (let i = 0; i < dots.length; i++) {
        if (i == k) continue;
        c /= e[0] - dots[i][0];
      }
      return c;
    });
    this.updateImg()
  }
  addDot(dot) {
    let index = this.dots.push(dot);
    this.solveParams();
    return index;
  }
  get(x) {
    const { dots, params } = this;
    let dot = dots.find((e) => e[0] == x);
    if (dot) return dot[1];
    let k = 1;
    for (let e of dots) {
      k *= x - e[0];
    }
    let ans = 0;
    for (let i in params) {
      ans += (params[i] * k) / (x - dots[i][0]);
    }
    if(this.bounds == true){
      if(this.canvas){
        if(ans< 0) ans=0;
        const {height} = this.canvas
        if(ans>height) ans=height;
      }
    }
    return ans;
  }

}
