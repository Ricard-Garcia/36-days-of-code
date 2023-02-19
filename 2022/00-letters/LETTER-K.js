// K (2022.03.17)

let bgCol = [170, 240, 240];
let ltCol = [bgCol[0] - 1, bgCol[1] - 1, bgCol[2] - 1];
let fgCol = [240, 250, 250];

let lines = [];
let numLines = 5000;
let sW = 10;
let maxLineLength = 20;
let lengths = [0, maxLineLength / 4, maxLineLength / 2, maxLineLength];

let fUpdates = 80;

let defaultColor = 245;
let lineColor;

let xoff = 0;
let yoff = 300;
let noiseInc = 0.02;

margin = -80;

let pointPos;

let mRadius = 20;

let letter = "K";

function setup() {
  createCanvas(postW, postH);
  angleMode(DEGREES);

  pointPos = new p5.Vector(
    map(noise(xoff), 0, 1, margin, width - margin),
    map(noise(yoff), 0, 1, margin, height - margin)
  );

  lineColor = color(defaultColor);
  lineColor.setAlpha(0);

  // Initial line
  for (let i = 0; i < numLines; i++) {
    let l = new Line(
      floor(random(margin, width - margin - length)),
      floor(random(margin, height - margin)),
      random(lengths)
    );
    lines.push(l);
  }
  background(bgCol[0], bgCol[1], bgCol[2]);

  // Text
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 25, height / 2 - height * 0.07);
}

function draw() {
  for (let f = 0; f < fUpdates; f++) {
    let pixel = get(pointPos.x, pointPos.y);
    for (let l = 0; l < lines.length; l++) {
      let line = lines[l];
      if (
        line.x > pointPos.x - mRadius &&
        line.x < pointPos.x + mRadius &&
        line.y > pointPos.y - mRadius &&
        line.y < pointPos.y + mRadius
      ) {
        if (
          pixel[0] === ltCol[0] &&
          pixel[1] === ltCol[1] &&
          pixel[2] === ltCol[2]
        ) {
          line.setColor(0);
        }
        line.update();
        line.show();
      }
    }

    // push();
    // noStroke();
    // fill("red");
    // circle(pointPos.x, pointPos.y, 30);
    // pop();

    pointPos.x = map(noise(xoff), 0, 1, margin, width - margin);
    pointPos.y = map(noise(yoff), 0, 1, margin, height - margin);

    xoff += noiseInc;
    yoff += noiseInc;
    // noLoop();
  }
}

class Line {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.color = lineColor;
    this.angle = random([0, 45, 90, 135, 180, 225, 270, 315]);
    this.sW = sW;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noFill();
    strokeWeight(this.sW);
    strokeCap(ROUND);
    stroke(this.color);
    line(-this.length / 2, 0, this.length / 2, 0);
    pop();
  }

  update() {
    this.angle += 45;
    if (this.color == lineColor) {
      let newColor = color(random(pixelGridColors));
      newColor.setAlpha(255);
      this.color = newColor;
    }
  }

  setColor(c) {
    this.color = c;
    this.sW = sW * 2;
  }
}
