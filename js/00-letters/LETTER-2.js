// 2 (2022.04.04)

let isNegative = false;
let bgCol;
let fgCol;
if (isNegative) {
  bgCol = [13, 15, 23];
  fgCol = [253, 238, 45];
} else {
  bgCol = [253, 238, 45];
  fgCol = [13, 15, 23];
}

margin = 100;
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let letter = "2";

let densityStep = 8;
let pixelSize = densityStep;
let xStepSize = 1;

let scaleFactor = 1.5;

let sW = 14;

let pixelsArr = [];

function setup() {
  createCanvas(postW, postH);
  frameRate(10);
  rectMode(CENTER);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.054);
  let pixelColor = [fgCol[0], fgCol[1], fgCol[2]];

  for (let j = 0; j <= height; j += densityStep) {
    let yMaxRandom = map(j, margin, height - margin, 1, 0);
    let randomFactor = map(j, margin, height - margin, 0.9, 0);
    for (let i = 0; i <= width; i += densityStep) {
      let y = j + margin / densityStep - pixelSize;
      let x = i + margin / densityStep - pixelSize;

      let pixel = get(x, y);

      let p;
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        if (yMaxRandom < random(1)) {
          p = new Pixel(x, y, pixelSize, pixelColor, randomFactor, 255);
        } else {
          p = new Pixel(x, y, pixelSize, pixelColor, randomFactor, 0);
        }
        pixelsArr.push(p);
      }
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  pixelsArr.forEach((p) => {
    p.show();
  });

  // noLoop();
}

function rPos(maxValue = pVariation) {
  return random(-maxValue, maxValue);
}

class Pixel {
  constructor(x, y, size, color, randomFactor, alfa) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(random(5), random(5));
    this.size = size;
    this.color = color;
    this.randomFactor = randomFactor;
    this.alpha = alfa;
  }

  show() {
    fill(this.color[0], this.color[1], this.color[2], this.alfa);
    square(this.location.x, this.location.y, this.size * random(1, 1));

    this.update();
  }

  update() {
    if (random(1) < this.randomFactor) {
      this.alfa = 0;
    } else {
      this.alfa = 255;
    }
  }
}
