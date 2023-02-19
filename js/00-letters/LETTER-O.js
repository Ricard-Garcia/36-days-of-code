// O (2022.03.21)

let img;

let cols = 20;
let rows = cols * 2;
let cW;
let cH;

margin = 40;

let growingRects = [];

function preload() {
  img = loadImage("../../assets/ASSET-O-blur.jpg");
}

function setup() {
  createCanvas(postW, postH);
  rectMode(CORNER);

  cW = floor((width - margin * 2) / cols);
  cH = floor((height - margin * 2) / rows);
  cM = cW * 0.3;
  blendMode(LIGHTEST);

  img.loadPixels();
  for (let i = 0; i < img.width; i += cW) {
    for (let j = 0; j < img.height; j += cH) {
      let pixelIndex = (i + j * img.width) * 4;

      let b = brightness(color(img.pixels[pixelIndex]));
      let mappedB = floor(map(b, 0, 100, 2, cW - cM * 1.4));
      let r = new GrowingRect(i + cM / 2 - 4, j + 10, cW - cM / 2, mappedB);

      growingRects.push(r);
    }
  }
}

function draw() {
  push();
  // background(44, 238, 196);
  background(0, 0, 10);
  pop();

  // img.loadPixels();
  // for (let i = 0; i < img.width; i += cW) {
  //   for (let j = 0; j < img.height; j += cH) {
  //     let pixelIndex = (i + j * img.width) * 4;

  //     let b = brightness(color(img.pixels[pixelIndex]));
  //     let mappedB = floor(map(b, 0, 100, 1, cW - cM));

  //     fill("white");
  //     stroke("whitesmoke");

  //     rect(i + cM / 2 - 10, j + 10, cW - cM / 2, mappedB, 20);
  //   }
  // }
  noStroke();

  growingRects.forEach((gRect) => {
    gRect.show();
  });

  // noLoop();
}

class GrowingRect {
  constructor(x, y, maxWidth, maxHeight, isGrowing = true) {
    this.x = x;
    this.y = y;
    this.maxWidth = maxWidth;
    this.w = 0;
    this.maxHeight = maxHeight;
    this.h = 1;
    this.isGrowing = isGrowing;
  }

  show() {
    // fill(0, 0, 10);
    // fill(44, 238, 196);
    // rect(this.x, this.y, this.w, this.h, 10);

    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(0, 255, 0);
    rect(this.x - cM / 4, this.y - cM / 4, this.w, this.h, 10);
    fill(0, 0, 255);
    rect(this.x + cM / 4, this.y + cM / 4, this.w, this.h, 10);

    if (this.isGrowing) {
      this.update();
    }
  }

  update() {
    if (this.isGrowing) {
      if (this.w < this.maxWidth) {
        this.w += 0.6;
      } else if (this.w >= this.w && this.h <= this.maxHeight) {
        this.h += 0.6;
      } else {
        this.isGrowing = false;
      }
    }
  }
}
