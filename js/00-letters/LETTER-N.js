// M (2022.03.20)

let bgCol = [15, 15, 15];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 77];

let angle = 0;
let xoff = 0;
let yoff;

let foff = 0;
let inc = 0.1;

let isStroke = false;

let letter = "N";

margin = 0;

let cols = 20;
let rows = cols;
let cW;
let cH;
let cM;

let originText = 0;

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cH * 0.4;
}

function draw() {
  xoff = foff;
  // yoff = foff;
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2, height / 2 - height * 0.05);

  // noFill();
  strokeWeight(3);
  noFill();

  rectMode(CENTER);

  for (let i = 0; i <= rows; i++) {
    let yoff = 0;
    for (let j = 0; j <= cols; j++) {
      let x = cW * j + margin;
      let y = cH * i + margin + cM / 2;

      let noiseValue = noise(xoff, yoff);
      let pixel = get(x, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        stroke("Crimson");
        strokeWeight(5);
        noFill();
      } else {
        noStroke();
        fill(255);
      }

      if (noiseValue <= 0.45) {
        triangle(
          x - cW / 2 + cM / 2,
          y + cH / 2 - cM / 1.5,
          x,
          y - cH / 2 + cM / 2,
          x + cW / 2 - cM / 2,
          y + cH / 2 - cM / 1.5
        );
      } else {
        circle(x, y, cW - cM / 1.4);
        // fill(255);
        // square(x, y, cW * innerScale);
      }
      yoff += inc;
    }
    xoff += inc;
  }

  // originText += 50;

  foff += 0.04;
  // noLoop();
}
