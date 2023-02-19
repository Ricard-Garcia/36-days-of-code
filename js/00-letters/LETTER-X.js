// U (2022.03.27)

let bgCol = [2, 2, 10];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [255, 110, 206];

let letter = "X";

margin = 0;

let cols = 30;
let rows = cols;
let cW;
let cH;

let pVariation = 10;
let stepSize = 1;

let sW = 14;
let centralMargin = sW;

let pointsArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);

  angleMode(DEGREES);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.4;

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();

  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.054);

  for (let j = 0; j <= cols; j++) {
    let x = cW * j + margin;

    let widthString;

    if (x <= width / 2) {
      widthString = "left";
    } else {
      widthString = "right";
    }

    let p1 = new DiagonalPoint(x, 0, `top-${widthString}`);
    let p2 = new DiagonalPoint(x, height, `bottom-${widthString}`);

    pointsArr.push(p1);
    pointsArr.push(p2);
  }

  for (let i = 0; i <= rows; i++) {
    let y = cH * i + margin;

    let heightString;

    if (y <= height / 2) {
      heightString = "top";
    } else {
      heightString = "bottom";
    }

    let p1 = new DiagonalPoint(0, y, `${heightString}-left`);
    let p2 = new DiagonalPoint(width, y, `${heightString}-right`);

    pointsArr.push(p1);
    pointsArr.push(p2);
  }
}

function draw() {
  stroke(fgCol[0], fgCol[1], fgCol[2]);
  pointsArr.forEach((p) => {
    p.show();
  });

  // noLoop();
}

function rPos(maxValue = pVariation) {
  return random(-maxValue, maxValue);
}

class DiagonalPoint {
  constructor(x, y, placement, sSize = stepSize) {
    this.location = new p5.Vector(x, y);
    this.timesVisited = 0;
    this.maxTimesVisited = 3;
    this.placement = placement;
    this.sSize = sSize;
    this.stepX;
    this.stepY;
    this.sW = sW;
  }

  setStep() {
    if (this.placement === "top-left") {
      this.stepX = this.sSize;
      this.stepY = this.sSize;
    } else if (this.placement === "top-right") {
      this.stepX = -this.sSize;
      this.stepY = this.sSize;
    } else if (this.placement === "bottom-left") {
      this.stepX = this.sSize;
      this.stepY = -this.sSize;
    } else if (this.placement === "bottom-right") {
      this.stepX = -this.sSize;
      this.stepY = -this.sSize;
    }
  }

  show() {
    this.setStep();

    strokeWeight(this.sW);
    point(this.location.x, this.location.y);

    if (
      (this.placement === "top-left" &&
        this.location.x <= width / 2 - centralMargin &&
        this.location.y <= height / 2 - centralMargin) ||
      (this.placement === "top-right" &&
        this.location.x >= width / 2 + centralMargin &&
        this.location.y <= height / 2 - centralMargin) ||
      (this.placement === "bottom-left" &&
        this.location.x <= width / 2 - centralMargin &&
        this.location.y >= height / 2 + centralMargin) ||
      (this.placement === "bottom-right" &&
        this.location.x >= width / 2 + centralMargin &&
        this.location.y >= height / 2 + centralMargin)
    ) {
      this.update();
      this.setStroke();
    }
  }

  update() {
    this.location.x += this.stepX;
    this.location.y += this.stepY;
  }

  setStroke() {
    let pixel;

    if (this.placement === "top-left") {
      pixel = get(this.location.x + sW, this.location.y + sW);
    } else if (this.placement === "top-right") {
      pixel = get(this.location.x - sW, this.location.y + sW);
    } else if (this.placement === "bottom-left") {
      pixel = get(this.location.x + sW, this.location.y - sW);
    } else if (this.placement === "bottom-right") {
      pixel = get(this.location.x - sW, this.location.y - sW);
    }

    if (
      pixel[0] === ltCol[0] &&
      pixel[1] === ltCol[1] &&
      pixel[2] === ltCol[2]
    ) {
      this.sW = sW / 5;
    } else {
      this.sW = sW;
    }
  }
}
