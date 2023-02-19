// B (2022.03.08)

let w;
let iF = 12;
let sW = 8;
let fUpdates = 400;
let cMargin = 120;

let centralSpace = false;

let gradientColors;
let isWarm = false;

margin = 0;

let spots = [];

function setup() {
  createCanvas(postW, postH);

  gradientColors = {
    top: "rgb(235, 138, 155)",
    bottom: "rgb(235, 138, 155)",
    left: "rgb(235, 138, 155)",
    right: "rgb(235, 138, 155)",
    center: "rgb(235, 138, 155)",
  };

  w = new Walker();

  background(184, 24, 61);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(184 + 1, 24 + 1, 61 + 1);
  text("B", width / 2, height / 2 - height * 0.05);
}

function draw() {
  for (let i = 0; i < fUpdates; i++) {
    w.show();
    w.update();
  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.color = "rgb(184, 24, 61)";
  }

  show() {
    let pixel = get(this.x, this.y);

    if (pixel[0] == 184 + 1 && pixel[1] == 24 + 1 && pixel[2] == 61 + 1) {
      stroke(184, 24, 61, 0.2);
    } else {
      stroke(this.color);
    }
    strokeWeight(sW);
    point(this.x, this.y);
  }

  update() {
    let xInc = random(-1, 1);
    let yInc = random(-1, 1);

    // Left / Right
    if (this.x + xInc * iF <= margin) {
      xInc *= -1;
      this.color = gradientColors.left;
    }

    if (this.x + xInc * iF >= width - margin) {
      xInc *= -1;
      this.color = gradientColors.right;
    }

    // Bottom / Top
    if (this.y + yInc * iF <= margin) {
      yInc *= -1;

      this.color = gradientColors.bottom;
    }

    if (this.y + yInc * iF >= height - margin) {
      yInc *= -1;

      this.color = gradientColors.top;
    }

    this.x += xInc * iF;
    this.y += yInc * iF;
  }
}
