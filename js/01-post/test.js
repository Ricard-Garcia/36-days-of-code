// Scratches (2022.05.22)

// Capturer
// --------
let frameRate = 30;
let capturer = new CCapture({
  format: "jpg",
  frameRate,
  name: "foo",
  verbose: true,
  // quality: 100,
  // autoSaveTime: 120,
});

// --------

let cD;
let angle = 180;
let originY;
let canvas;

function setup() {
  let p5Canvas = createCanvas(500, 500);
  canvas = p5Canvas.canvas;

  margin = height * 0.1;
  cD = height * 0.1;
  originY = height / 2;
}

function draw() {
  capturer.start();
  background(255);
  const cY = map(sin(angle), -1, 1, margin, height - margin);

  noStroke();
  fill(0);
  circle(width / 2, originY + cY, cD);

  console.log(canvas);
  if (frameCount < 180) {
    console.log("capturing");
    capturer.capture(canvas);
  } else if (frameCount === 2000) {
    capturer.stop();
    capturer.save();
    noLoop();
  }

  angle += 0.01;
}
