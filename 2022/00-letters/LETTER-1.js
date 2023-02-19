// º (2022.04.03)

let isNegative = true;
let bgCol;
let fgCol;

if (isNegative) {
  bgCol = [0, 0, 0];
  fgCol = [224, 137, 183];
} else {
  bgCol = [224, 137, 183];
  fgCol = [0, 0, 0];
}

margin = 0;

let ltCol = [bgCol[0] + 100, bgCol[1] + 100, bgCol[2] + 100];
let letter = "1";

let sW;

let cols = 20;
let rows = cols;

let angleInc = 3;

let rotativesArr = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);
  angleMode(DEGREES);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.05);

  let cW = (width - margin * 2) / cols;
  let cH = (height - margin * 2) / rows;
  let cM = cW * 0.4;

  sW = cW * 0.3;

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let pixel = get(x, y);
      let rotation = "negative";

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        rotation = "positive";
      }
      r = new Rotative(x, y, cW - cM, rotation);

      rotativesArr.push(r);
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  rotativesArr.forEach((r) => {
    r.show();
  });

  // noLoop();
}

class Rotative {
  constructor(x, y, size, rotation, color = [224, 137, 183], strokeW = sW) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(random(5), random(5));
    this.size = size;
    this.color = color;
    this.strokeW = strokeW;
    this.rotation = rotation;

    if (this.rotation === "positive") {
      this.angle = 90;
    } else {
      this.angle = 0;
    }
  }

  show() {
    noFill();
    stroke(this.color);
    strokeWeight(this.strokeW);

    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    line(-this.size / 2, 0, this.size / 2, 0);
    strokeWeight(this.strokeW);
    // circle(0, 0, this.size);
    pop();

    this.update();
  }

  update() {
    if (this.rotation === "positive") {
      this.angle += angleInc;
    } else {
      this.angle -= angleInc;
    }
  }
}
