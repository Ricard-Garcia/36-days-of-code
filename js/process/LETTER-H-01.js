// F (2022.03.12)

let bgCol = [10, 10, 10];
let ltCol = [bgCol[0] + 100, bgCol[1] + 100, bgCol[2] + 100];
let fgCol = [250, 250, 250];

let angle = 90;

margin = 50;

let numCircles = 2;

let masksArr = [];
let radiusInc;
let circleD;
let circleMask;
let letterImage;
let graphicsArr;

function preload() {
  letterImage = loadImage("./assets/ASSET-H.jpg");
}

function setup() {
  createCanvas(postW, postH);
  angleMode(DEGREES);

  graphicsArr = [createGraphics(width, height), createGraphics(width, height)];

  radiusDecrement = (width / 2 - margin) / numCircles;
  initialD = width - margin * 2;
  circleD = initialD;

  for (let i = 0; i < numCircles; i++) {
    let m = new MaskedLetter(
      0,
      0,
      circleD,
      letterImage,
      graphicsArr[i],
      i * 20
    );
    masksArr.push(m);
    circleD -= radiusDecrement * 2;
  }
  background(0);
}

function draw() {
  for (let i = 0; i < masksArr.length; i++) {
    let m = masksArr[i];
    m.show();
  }
  // noLoop();
}

class MaskedLetter {
  constructor(x, y, cD, img, mask, a = 0, w = postW, h = postH) {
    this.x = x;
    this.y = y;
    this.cD = cD;
    this.img = img;
    this.mask = mask;
    this.a = a;
    this.w = w;
    this.h = h;
  }

  show() {
    push();
    translate(width / 2, height / 2);
    rotate(this.a);
    this.mask.circle(this.w / 2, this.h / 2, this.cD);
    this.img.mask(this.mask);
    tint(255, 127); // Mostrar a media opacidad

    image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    pop();

    this.update();
  }

  update() {
    // let newAngle = constrain(mouseX, 0, 360);
    // this.a = newAngle;
    if (this.a % 360 === 0 && this.a !== 0) {
      return false;
    } else {
      this.a += 5;
    }
  }
}
