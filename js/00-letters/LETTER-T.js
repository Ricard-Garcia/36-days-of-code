// T (2022.03.26)

let bgCol = [10, 10, 20];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let letter = "T";

margin = 80;

let cols = 25;
let rows = cols;
let cW;
let cH;

let sW = 2;

let xStep;

let textOriginX1;
let textOriginX2;

function setup() {
  createCanvas(postW, postH);

  // frameRate(1);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.4;

  textOriginX1 = width / 2 + 20;
  textOriginX2 = -160;
  xStep = cW;
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, textOriginX1, height / 2 - height * 0.035);
  textFont(groundbeatOutline);
  text(letter, textOriginX2 + 10, height / 2 - height * 0.037);

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin - 10;
      let y = cH * i + margin - 10;

      textFont("Helvetica");
      textSize(18);
      fill(fgCol[0], fgCol[1], fgCol[2]);

      let pixel = get(x, y);
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        noStroke();
        fill(fgCol[0], fgCol[1], fgCol[2]);
      } else {
        strokeWeight(sW);
        stroke(fgCol[0], fgCol[1], fgCol[2], 40);
        noFill();
      }
      circle(x, y, cW - cM * 0.5);
    }
  }

  if (textOriginX1 + xStep >= width - margin + 260) {
    textOriginX1 = -160;
  } else {
    textOriginX1 += xStep;
  }

  if (textOriginX2 + xStep >= width - margin + 260) {
    textOriginX2 = -160;
  } else {
    textOriginX2 += xStep;
  }
  // noLoop();
}
