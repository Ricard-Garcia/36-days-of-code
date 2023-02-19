// º (2022.04.03)

let isNegative = true;
let bgCol;
let fgCol;

if (isNegative) {
  bgCol = [0, 10, 0];
  fgCol = [224, 137, 183];
} else {
  bgCol = [244, 250, 250];
  fgCol = [0, 10, 0];
}

margin = -10;
sW = 2;

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let letter = "A";

let cols = 28;
let rows = cols;

let wigglesArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);

  cD = width * 0.28;
  cR = cD / 2;

  background(bgCol[0], bgCol[1], bgCol[2]);
  // textFont(groundbeatOutline);
  // textAlign(CENTER, CENTER);
  // textSize(width * 1.25);
  // fill(ltCol[0], ltCol[1], ltCol[2]);
  // text(letter, width / 2, height / 2 - height * 0.05);

  push();
  noFill();
  stroke(ltCol[0], ltCol[1], ltCol[2]);
  strokeWeight(240);
  circle(width / 2, height / 2, width * 0.6);
  pop();

  let cW = (width - margin * 2) / cols;
  let cH = (height - margin * 2) / rows;

  sW = cW * 0.1;

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let pixel = get(x, y);
      let maxRebounds = 3;

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        maxRebounds = 40;
      }
      let w = new Wiggle(x, y, cW, maxRebounds);
      wigglesArr.push(w);
    }
  }

  textFont(groundbeatLight);
  saveFrames("scratch-post", "png", 15, 30);
}

function draw() {
  // background(bgCol[0], bgCol[1], bgCol[2]);

  wigglesArr.forEach((w) => {
    w.show();
  });

  // noLoop();
}

class Wiggle {
  constructor(x, y, size, maxRebounds) {
    this.location = new p5.Vector(x, y);
    this.insidePoint = new p5.Vector(this.location.x, this.location.y);
    this.step = new p5.Vector(random(-1, 1), random(-1, 1));
    this.size = size;
    this.maxRebounds = maxRebounds;
    this.reboundCount = 0;
  }

  show() {
    noStroke();
    // strokeWeight(5);
    // fill(255, 20);
    // circle(this.location.x, this.location.y, this.size);

    push();
    stroke(255);
    strokeWeight(sW);
    point(this.insidePoint.x, this.insidePoint.y);
    pop();

    if (this.reboundCount < this.maxRebounds) {
      this.update();
    }
  }

  update() {
    this.insidePoint.x += this.step.x;
    this.insidePoint.y += this.step.y;

    if (
      dist(
        this.location.x,
        this.location.y,
        this.insidePoint.x,
        this.insidePoint.y
      ) >=
      this.size / 2 - sW / 2
    ) {
      let hasPositiveXStep = this.step.x > 0;
      let hasPositiveYStep = this.step.y > 0;

      if (hasPositiveXStep) {
        this.step.x = random(-2, -1);
      } else {
        this.step.x = random(1, 2);
      }

      if (hasPositiveYStep) {
        this.step.y = random(-2, -1);
      } else {
        this.step.y = random(1, 2);
      }

      this.insidePoint.x += this.step.x;
      this.insidePoint.y += this.step.y;

      this.reboundCount++;
    }
  }
}
