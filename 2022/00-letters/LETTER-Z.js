// U (2022.03.27)

let isNegative = true;
let bgCol;
let fgCol;
if (isNegative) {
  bgCol = [0, 0, 0];
  fgCol = [254, 254, 254];
} else {
  bgCol = [250, 250, 254];
  fgCol = [0, 0, 0];
}

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let letter = "Z";

margin = 100;

let densityStep = 14;
let pixelSize = densityStep;
let xStepSize = 1;

let scaleFactor = 1.5;

let sW = 14;

let pixelsArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.054);
  let pixelColor = [fgCol[0], fgCol[1], fgCol[2]];

  for (let j = 0; j <= height; j += densityStep) {
    let yMaxRandom = map(j, margin, height - margin, 0, 0.65);
    for (let i = 0; i <= width; i += densityStep) {
      let y = j + margin / densityStep - pixelSize;
      let x = i + margin / densityStep - pixelSize;

      let pixel = get(x, y);

      if (
        pixel[0] !== ltCol[0] &&
        pixel[1] !== ltCol[1] &&
        pixel[2] !== ltCol[2]
      ) {
        if (yMaxRandom < random(1)) {
          let p = new Pixel(x, y, pixelSize, pixelColor);
          pixelsArr.push(p);
        }
      }
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  pixelsArr.forEach((p) => {
    p.show();
  });

  // if (frameCount == 12) {
  //   noLoop();
  // }
}

function rPos(maxValue = pVariation) {
  return random(-maxValue, maxValue);
}

class Pixel {
  constructor(x, y, size, color) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(random(5), random(5));
    this.size = size;
    this.color = color;
    this.factor = random(0.2, 2);
  }

  show() {
    fill(this.color);
    circle(this.location.x, this.location.y, this.size * random(0.2, 2));

    this.update(0);
  }

  update() {
    if (this.location.x <= width / 2) {
      this.location.x -= this.step.x;
    } else {
      this.location.x += this.step.x;
    }

    if (this.location.y <= height / 2) {
      this.location.y -= this.step.y;
    } else {
      this.location.y += this.step.y;
    }
  }
}
