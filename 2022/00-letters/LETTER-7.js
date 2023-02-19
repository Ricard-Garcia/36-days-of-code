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

sW = 200;

let frameColIndex = 0;
let colIndex;

let colInc = 0.125;
margin = 50 + sW / 2;

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let letter = "7";

let pointIndex = 0;
let points;

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);

  colorMode(HSB, 100);

  points = groundbeatBlack.textToPoints(
    letter,
    (width / 2) * 0.56,
    (height / 2) * 1.56,
    width * 0.85,
    {
      sampleFactor: 0.27,
    }
  );
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);
  strokeWeight(sW);

  colIndex = frameColIndex;
  points.forEach((p) => {
    stroke(colIndex, 100, 100);

    if (colIndex == 100) {
      colIndex = 0;
    }

    colIndex += colInc;
    point(p.x, p.y);
  });

  if (frameColIndex == 100) {
    frameColIndex = 0;
  } else {
    frameColIndex += 1;
  }
}
