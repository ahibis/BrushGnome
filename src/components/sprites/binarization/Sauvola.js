let kernel = 0;
function niblack(gpu, img, a ,k) {
  const { width, height } = img;

    kernel = gpu.createKernel(
      function (image, a, k) {
        const { x, y } = this.thread;
        const shift = Math.floor(a / 2);
        let MX = 0;
        let MX2 = 0;

        for (let i = 0; i < a; i += 1) {
          for (let k = 0; k < a; k += 1) {
            const dot = image[y + i - shift][x + k- shift];
            const X = dot[0] + dot[1] + dot[2];
            MX += X;
            MX2 += X * X;
          }
        }
        MX /= a * a;
        MX2 /= a * a;
        const DX = MX2 - MX * MX;
        const q = Math.sqrt(DX);
        const t = MX * (1 + k* ( q / 1.5 - 1))
        const pixel = image[y][x];
        const color = pixel[0] + pixel[1] + pixel[2];
        if (color <= t) {
          this.color(0, 0, 0, pixel[3]);
        } else {
          this.color(1, 1, 1, pixel[3]);
        }
      },
      { output: [width, height], graphical: true }
    );
    kernel(img, a, k);
  
}
export default niblack;
