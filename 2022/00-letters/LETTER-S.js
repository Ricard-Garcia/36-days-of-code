// S (2022.03.25)

let bgCol = [250, 250, 250];
let ltCol = [bgCol[0] - 1, bgCol[1] - 1, bgCol[2] - 1];
let fgCol = [254, 246, 77];

let letter = "S";

margin = 0;

let cols = 31;
let rows = cols;
let cW;
let cH;

let numB = 800;
let bouncers = [];
let b;
let strokeW = 10;

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;

  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 40, height / 2 - height * 0.05);

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let pixel = get(x, y);

      if (
        pixel[0] !== ltCol[0] &&
        pixel[1] !== ltCol[1] &&
        pixel[2] !== ltCol[2]
      ) {
        b = new Bouncer(x, y, ltCol, random(["darkblue"]));

        bouncers.push(b);
      }
    }
  }
  background(bgCol[0], bgCol[1], bgCol[2]);
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2], 20);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.05);

  bouncers.forEach((b) => {
    b.show();
  });

  // noLoop();
}

class Bouncer {
  constructor(x, y, lCol, c = "red", s = strokeW / 3, sW = strokeW) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(random([-s, s]), random([-s, s]));
    this.sW = sW;
    this.lCol = color(lCol).levels;
    this.c = color(c);

    this.pixel = get(
      this.location.x + this.sW * 1.5,
      this.location.y + this.sW * 1.5
    );
  }

  show() {
    stroke(this.c);
    strokeWeight(this.sW);
    point(this.location.x, this.location.y);

    this.update();
  }

  update() {
    let nextX = this.location.x + this.step.x;
    let nextY = this.location.y + this.step.y;

    let pixel;

    if (this.step.x <= 0 && this.step.y >= 0) {
      pixel = get(nextX - this.sW * 2, nextY + this.sW * 2);
    } else if (this.step.x >= 0 && this.step.y >= 0) {
      pixel = get(nextX + this.sW * 2, nextY + this.sW * 2);
    } else if (this.step.x >= 0 && this.step.y <= 0) {
      pixel = get(nextX + this.sW * 2, nextY - this.sW * 2);
    } else {
      pixel = get(nextX - this.sW * 2, nextY - this.sW * 2);
    }

    // X locations
    if (
      nextX <= margin ||
      nextX >= width - margin * 2 ||
      (pixel[0] === this.lCol[0] &&
        pixel[1] === this.lCol[1] &&
        pixel[2] === this.lCol[2])
    ) {
      this.step.x *= -1;
    } else {
      this.location.x += this.step.x;
    }

    if (
      nextY <= margin ||
      nextY >= height - margin * 2 ||
      (pixel[0] === this.lCol[0] &&
        pixel[1] === this.lCol[1] &&
        pixel[2] === this.lCol[2])
    ) {
      this.step.y *= -1;
    } else {
      this.location.y += this.step.y;
    }
  }
}
