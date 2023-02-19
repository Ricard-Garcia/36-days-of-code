// L (2022.03.18)

let bgCol = [10, 10, 10];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let primaryColor;
let secondaryColor;

let cols = 80;
let rows = cols / 2;
let cW;
let cH;
let cD;

margin = -3;

let angleInc = 20;

let letter = "NOODLES";

let circlesArr = [];

// let startColAngle = 90;

function setup() {
  createCanvas(postW * 4, postH * 2);
  angleMode(DEGREES);

  // frameRate(1);
  circleColor = color("red");
  primaryColor = color("yellow");
  // primaryColor = color("lighgreen");
  secondaryColor = color("yellow");

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cD = cH * 0.8;

  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.2);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 + 20, height / 2 - 20);
  // blendMode(LIGHTEST);

  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows + 1; j++) {
      let x = cW * i + margin;
      let y = cH * j + margin;

      let pixel = get(x, y);
      let c;
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        c = new GrowingCircle(x, y, cD, 180, true);
      } else {
        c = new GrowingCircle(x, y, cD, false);
      }
      circlesArr.push(c);

      fill(circleColor);
      // circle(x, y, cD);
    }
  }
}

function draw() {
  circlesArr.forEach((c) => {
    c.show();
  });
}

class GrowingCircle {
  constructor(x, y, d, maxAngle, inLetter, color = primaryColor) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.a = -90;
    this.maxAngle = maxAngle;
    this.inLetter = inLetter;
    this.sW = this.d * 0.22;
    this.color = color;

    let pointX =
      floor(
        map(
          cos(this.a),
          -1,
          1,
          this.x + this.sW / 2,
          this.x + this.d - this.sW / 2
        )
      ) -
      this.d / 2;
    let pointY =
      floor(
        map(
          sin(this.a),
          -1,
          1,
          this.y + this.sW / 2,
          this.y + this.d - this.sW / 2
        )
      ) -
      this.d / 2;

    this.pLocation = new p5.Vector(pointX, pointY);
  }

  show() {
    push();
    stroke(this.color);
    // stroke(getRandomColor(w));
    strokeWeight(this.sW);
    point(this.pLocation.x, this.pLocation.y);
    pop();

    this.update();
  }

  update() {
    this.pLocation.x =
      floor(
        map(
          cos(this.a),
          -1,
          1,
          this.x + this.sW / 2,
          this.x + this.d - this.sW / 2
        )
      ) -
      this.d / 2;
    this.pLocation.y =
      floor(
        map(
          sin(this.a),
          -1,
          1,
          this.y + this.sW / 2,
          this.y + this.d - this.sW / 2
        )
      ) -
      this.d / 2;

    if (this.inLetter && this.a <= this.maxAngle - 90) {
      this.a += angleInc;
    } else if (!this.inLetter) {
      this.a += angleInc;
    } else {
    }

    if (!this.inLetter && this.a >= 180 - 90) {
      this.color = secondaryColor;
      this.pLocation.y -= this.d - this.sW;
    }
    if (this.a >= 360 - 90) {
      noLoop();
    }
  }
}
