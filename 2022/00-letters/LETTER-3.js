// º (2022.04.03)

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

margin = 100;

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let letter = "3";

let cols = 40;
let rows = cols;

let sW = 30;

let cD, cR, cX, cY;

let cosAngle = 0;
let sinAngle = 0;
let angleInc = 0.5;

let lettersArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);

  cD = width * 0.28;
  cR = cD / 2;

  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.05);

  let cW = (width - margin * 2) / cols;
  let cH = (height - margin * 2) / rows;

  sW = cW * 0.3;

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let pixel = get(x, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        r = { letter, x, y };
        lettersArr.push(r);
      }
    }
  }

  textFont(groundbeatLight);
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  strokeWeight(14);
  noStroke();
  fill("lightGreen");
  textFont(groundbeatBlack);

  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  // fill(fgCol[0], fgCol[1], fgCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.05);

  cX = map(cos(cosAngle), -1, 1, margin + cR, width - margin - cR);
  cY = map(sin(sinAngle), -1, 1, margin + cR, height - margin - cR);

  push();
  noStroke();
  fill(bgCol[0], bgCol[1], bgCol[2]);
  circle(cX, cY, cD);
  pop();

  textSize(28);
  noStroke();
  fill("lightGreen");

  lettersArr.forEach((l) => {
    if (dist(cX, cY, l.x, l.y) < cR - sW) {
      text(l.letter, l.x, l.y);
    }
  });

  strokeWeight(14);
  push();
  stroke(255);
  noFill();
  circle(cX, cY, cD);
  pop();

  // noLoop();

  sinAngle += angleInc * 2;
  cosAngle += angleInc;
}
