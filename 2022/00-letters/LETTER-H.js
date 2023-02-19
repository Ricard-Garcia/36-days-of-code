// H (2022.03.14)

let bgCol = [10, 10, 10];
let ltCol = [bgCol[0] + 100, bgCol[1] + 100, bgCol[2] + 100];
let fgCol = [250, 250, 250];

let numLetters = 8;
let maskArr = [];
let cH;

let angle = 0;
let amplitude = 70;
let angleInc = 360 / (numLetters - 0) / 100;
let sW = 12;

margin = 120;

let letter = "H";

let xInc;
let bbox;

function setup() {
  createCanvas(postW, postH);

  // Text
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);

  bbox = groundbeatBlack.textBounds(letter, 0, 0, width * 0.9);
  xInc = (width - margin * 2 - bbox.w) / numLetters;
}

function draw() {
  push();
  blendMode(BLEND);
  background(bgCol[0], bgCol[1], bgCol[2]);
  pop();

  translate(xInc * numLetters + margin + 50, 0);

  for (let i = 0; i < numLetters; i++) {
    let outterSin = map(
      sin(angle + angleInc * i),
      -1,
      1,
      -amplitude,
      amplitude
    );
    rgbColors.forEach((color, cIndex) => {
      let innerSin = map(sin(angle + cIndex), -1, 1, -amplitude, amplitude);
      fill(10, 10, 10, 200);
      blendMode(LIGHTEST);

      stroke(color[0], color[1], color[2]);
      strokeWeight(sW);
      text(
        letter,
        xInc * i,
        height / 2 - height * 0.04 + (outterSin - innerSin / 4)
      );
    });
  }
  angle += 0.05;
  // noLoop();
}
