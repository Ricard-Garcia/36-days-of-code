// 4 (2022.04.06)

let isNegative = false;
let bgCol;
let fgCol;
if (isNegative) {
  bgCol = [13, 15, 23];
  fgCol = [245, 245, 254];
} else {
  bgCol = [245, 245, 254];
  fgCol = [13, 15, 23];
}

margin = 80;
let ltCol = [bgCol[0] - 1, bgCol[1] - 1, bgCol[2] - 1];

let directions = ["v", "h", "d1", "d2"];

let letter = "8";

let cols = 5;
let rows = cols;

let cW, cH;

let sW = 20;

let lewittsArr = [];

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.08;

  let colors = ["gold", "Gainsboro", "LightSkyBlue", "Crimson"];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cW + margin + cM / 2;
      let y = j * cH + margin + cM / 2;

      let lr = new LewittRect(
        x,
        y,
        cW - cM,
        cH - cM,
        12,
        12,
        random(["v", "h"]),
        random(colors)
      );
      lewittsArr.push(lr);
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  strokeWeight(sW);
  stroke(ltCol[0], ltCol[1], ltCol[2]);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 10, height / 2 - height * 0.05);

  lewittsArr.forEach((l) => {
    l.show();
  });

  noLoop();
}

class LewittRect {
  constructor(x, y, w, h, r, c, dir, col, lc = ltCol, s = sW) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dir = dir;
    this.c = c;
    this.cW = this.w / this.c;
    this.r = r;
    this.cH = this.h / this.r;
    this.lc = lc;
    this.sW = this.w * 0.05;
    this.col = col;
  }

  show() {
    strokeWeight(this.sW);

    stroke(this.col);

    switch (this.dir) {
      case "v":
        for (let c = 0; c <= this.c; c++) {
          for (let j = 0; j < this.h; j++) {
            let x = this.x + this.cW * c;
            let y = this.y + j;

            if (isLetterPixel(x, y + this.sW / 2, this.lc)) {
              strokeWeight(0);
            } else {
              strokeWeight(this.sW);
            }

            point(x, y);
          }
        }
        break;
      case "h":
        for (let r = 0; r <= this.r; r++) {
          for (let j = 0; j < this.w; j++) {
            let x = this.x + j;
            let y = this.y + this.cH * r;
            if (isLetterPixel(x + this.sW / 2, y, this.lc)) {
              strokeWeight(0);
            } else {
              strokeWeight(this.sW);
            }
            point(x, y);
          }
        }
        break;
      default:
        break;
    }

    strokeWeight(this.sW);
    stroke(0);
    noFill();
    strokeCap(ROUND);

    // fill(80);

    rect(this.x, this.y, this.w, this.h);
  }
}

function isLetterPixel(x, y, letterColor) {
  let pixel = get(x, y);
  if (
    pixel[0] === letterColor[0] &&
    pixel[1] === letterColor[1] &&
    pixel[2] === letterColor[2]
  ) {
    return true;
  }

  return false;
}
