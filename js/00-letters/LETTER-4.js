// 4 (2022.04.06)

let isNegative = false;
let bgCol;
let fgCol;
if (isNegative) {
  bgCol = [13, 15, 23];
  fgCol = [250, 238, 45];
} else {
  bgCol = [250, 250, 254];
  fgCol = [13, 15, 23];
}

margin = 100;
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let letter = "4";

let densityStep = 19;
let pixelSize = densityStep;
let xStepSize = 1;

let scaleFactor = 1.5;

let sW = 8;

let maxOscilation;

let colorsArr = warmColors;

let pixelsArr = [];

let mobileW;
let mobileY;

function setup() {
  createCanvas(postW, postH);
  frameRate(10);
  rectMode(CENTER);

  mobileW = width * 0.6;
  mobileY = height * 0.08;

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 3, height / 2 - height * 0.052);
  // let pixelColor = [fgCol[0], fgCol[1], fgCol[2]];

  for (let j = height; j >= 0; j -= densityStep) {
    for (let i = width; i >= 0; i -= densityStep) {
      let pixelColor = random(colorsArr);
      let y = j + margin / densityStep - pixelSize;
      let x = i + margin / densityStep - pixelSize;

      let pixel = get(x, y);

      let p;
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        p = new MobileElement(
          x,
          y,
          pixelSize * random(0.6, 3),
          color(pixelColor),
          pixelSize * 0.3
        );

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
}

class MobileElement {
  constructor(x, y, size, color, maxOscilation) {
    this.startAngle = random(0, 1000);
    this.angleStep = new p5.Vector(random([1, 2, 3, 4]), random([1, 2, 3, 4]));
    this.size = size;
    this.color = color.levels;
    this.originalX = x;
    this.maxOscilation = maxOscilation;

    const cosLocation = map(
      cos(this.startAngle),
      -1,
      1,
      -this.maxOscilation,
      this.maxOscilation
    );
    const sinLocation = map(
      sin(this.startAngle),
      -1,
      1,
      -this.maxOscilation,
      this.maxOscilation
    );

    this.location = new p5.Vector(x + cosLocation, y + sinLocation);
  }

  show() {
    strokeWeight(1);
    stroke(0.2);
    // stroke(this.color[0], this.color[1], this.color[2]);
    // line(this.location.x, this.location.y, this.originalX, mobileY);

    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alfa);
    circle(this.location.x, this.location.y, this.size);

    this.update();
  }

  update() {
    this.startAngle += 0.1;
    const cosLocation = map(
      cos(this.startAngle + this.angleStep.x),
      -1,
      1,
      -this.maxOscilation,
      this.maxOscilation
    );
    const sinLocation = map(
      sin(this.startAngle + this.angleStep.y),
      -1,
      1,
      -this.maxOscilation,
      this.maxOscilation
    );

    this.location.x += cosLocation;
    this.location.y += sinLocation;
  }
}
