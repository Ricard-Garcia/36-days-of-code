// 7 (2022.04.14)

let isNegative = true;
let bgCol;
let fgCol;

if (isNegative) {
  bgCol = [0, 10, 0];
  fgCol = [224, 137, 183];
} else {
  bgCol = [224, 137, 183];
  fgCol = [0, 0, 0];
}

sW = 14;

let maxStep = 3;
let minStep = 8;

let frameColIndex = 0;
let colIndex;

let colInc = 0.125;
margin = 50 + sW / 2;
margin = -20;

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let letter = "9";

let pointIndex = 0;
let points;

let newPoints = [];

let otherPoints = 200;

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);

  colorMode(HSB, 100);

  points = groundbeatBlack.textToPoints(
    letter,
    (width / 2) * 0.43,
    (height / 2) * 1.56,
    width * 0.9,
    {
      sampleFactor: 0.27,
    }
  );

  points.forEach((p) => {
    let newPoint = {
      originX: p.x,
      originY: p.y,
      x: p.x,
      y: p.y,
    };

    newPoints.push(newPoint);
  });

  for (let i = 0; i <= otherPoints; i++) {
    let x = random(margin, width - margin);
    let y = random(margin, height - margin);

    let otherPoint = {
      x,
      y,
    };

    newPoints.push(otherPoint);
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2], 14);
  strokeWeight(sW);

  colIndex = frameColIndex;
  newPoints.forEach((p, i) => {
    stroke(250);

    // push();
    // strokeWeight(sW / 6);
    // line(p.originX, p.originY, p.x, p.y);

    // pop();

    point(p.x, p.y);

    if (random(1) < 0.5) {
      if (p.x <= width / 2) {
        newPoints[i].x += random(-maxStep, minStep);
      } else {
        newPoints[i].x += random(-minStep, maxStep);
      }

      if (p.y <= height / 2) {
        newPoints[i].y += random(-maxStep, minStep);
      } else {
        newPoints[i].y += random(-minStep, maxStep);
      }
    }
  });
}
