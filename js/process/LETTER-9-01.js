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

sW = 7;

margin = -30;

let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let letter = "9";

let cols = 45;
let rows = cols;

let cW, cH, cM;

let circlesArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);
  // frameRate(1);

  background(bgCol[0], bgCol[1], bgCol[2]);

  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 10, height / 2 - height * 0.05);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.5;

  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      let x = i * cW + margin;
      let y = j * cH + margin;

      let insideLetter = false;
      let startAngle = 0;
      if (isLetterPixel(x, y, ltCol)) {
        insideLetter = true;
        startangle = 180;
      }

      let hC = new HalfCircle(x, y, cW, cH, fgCol, startAngle, insideLetter);

      circlesArr.push(hC);
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  circlesArr.forEach((hC) => {
    hC.show();
  });
}

class HalfCircle {
  constructor(x, y, w, h, c, startAngle, inside = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.m = this.w * 0.0;
    this.h = h;
    this.c = c;
    this.startAngle = startAngle;
    this.a = startAngle;
    this.inside = inside;
    this.reversed = false;
    this.angleInc = 10;
  }

  show() {
    strokeWeight(sW);
    fill(255);
    noStroke();

    circle(this.x, this.y, this.w * 0.2);

    stroke(255);
    noFill();
    if (this.inside) {
      arc(
        this.x,
        this.y,
        this.w - this.m,
        this.h - this.m,
        this.startAngle + 180,
        this.a,
        OPEN
      );
    } else {
      arc(
        this.x,
        this.y,
        this.w - this.m,
        this.h - this.m,
        this.startAngle,
        this.a,
        OPEN
      );
    }

    this.update();
  }

  update() {
    if (this.inside && !this.reversed) {
      this.a -= this.angleInc;
      if (this.a === -180) {
        this.reversed = true;
        this.a += this.angleInc;
      }
    } else if (this.inside && this.reversed) {
      this.a += this.angleInc;
      if (this.a === this.startAngle) {
        this.reversed = false;
        this.a -= this.angleInc;
      }
    }
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
