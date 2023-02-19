// U (2022.03.27)

let bgCol = [250, 250, 254];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let letter = "Y";

margin = 100;

let densityStep = 9;
let pixelSize = densityStep;
let xStepSize = 1;

let sW = 14;

let pixelsArr = [];
let othersArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.054);

  for (let j = 0; j <= width; j += densityStep) {
    for (let i = 0; i <= width; i += densityStep) {
      let x = j + margin;
      let y = i + margin;

      let yMaxRandom = map(y, 100, height - 100, 1.1, 0);

      let pixel = get(x, y);

      // if (yMaxRandom <= random(1)) {
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        let p = new Pixel(x, y, pixelSize, xStepSize, random(pixelGridColors));

        pixelsArr.push(p);
        // }
      }
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  pixelsArr.forEach((p) => {
    p.show();

    let pixel = get(p.location.x, p.location.y + p.size * 0.8);

    if (
      (pixel[0] !== 0 && pixel[1] !== 0 && pixel[2] !== 0) ||
      this.location.y + this.size / 2 < height - margin
    ) {
      p.update();
    }
  });
}

function rPos(maxValue = pVariation) {
  return random(-maxValue, maxValue);
}

class Pixel {
  constructor(x, y, size, xStepSize, color) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(rPos(xStepSize), random(2, 12));
    this.size = size;
    this.color = color;
  }

  show() {
    fill(this.color);
    circle(this.location.x, this.location.y, this.size);
  }

  update() {
    this.location.x += this.step.x + rPos(2);
    this.location.y += this.step.y;
  }
}
