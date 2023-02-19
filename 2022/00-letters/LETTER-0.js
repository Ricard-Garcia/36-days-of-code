// G (2022.03.13)

// Colors
let bgCol = [204, 254, 153];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [10, 10, 10];

// Units
margin = -10;

let letter = "0";
let cols = 70;
let rows = cols;
let dW;
let dH;
let dMargin;

let currRow = 0;
let currCol = 0;

let fontSizeAngle = -90;
let fSize = 14;

let lettersArr = [];

function setup() {
  createCanvas(postW, postH);
  angleMode(DEGREES);

  dW = (width - margin * 2) / cols;
  dH = (height - margin * 2) / rows;
  dMargin = dW * 0.15;

  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 30, height / 2 - height * 0.05);
}

function draw() {
  let y = margin + dH * currRow + dMargin;
  let x = margin + dW * currCol + dMargin;

  let sinFontSize = map(sin(fontSizeAngle), -1, 1, fSize / 6, fSize);
  let insideFontSize = map(sin(fontSizeAngle), -1, 1, fSize, fSize / 6);

  let pixel = get(x - dMargin, y - dMargin);

  let num;
  if (pixel[0] === ltCol[0] && pixel[1] === ltCol[1] && pixel[2] === ltCol[2]) {
    num = "0";
    textSize(insideFontSize);
  } else {
    num = "1";
    textSize(sinFontSize);
  }

  if (frameCount % rows === 0 && frameCount !== 0) {
    currCol++;
    currRow = -1;
  }

  if (currCol === cols && currRow === rows) {
    noLoop();
    console.log("Stopped");
  }

  textFont("Menlo");
  fill(fgCol[0], fgCol[1], fgCol[2]);
  text(num, x, y);

  currRow += 1;
  fontSizeAngle += 360 / (rows / 3);
}
