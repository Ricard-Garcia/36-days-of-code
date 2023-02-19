// U (2022.03.27)

let bgCol = [250, 250, 254];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let letter = "U";

margin = 0;

let cols = 27;
let rows = cols;
let cW;
let cH;

let sW = 14;

let xoff = 0;
let foff = 0;
let yoff;

let noiseInc = 0.2;

let xStep;

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);

  angleMode(DEGREES);
  blendMode(MULTIPLY);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.4;

  xStep = cW;
}

function draw() {
  yoff = foff;

  push();
  blendMode(BLEND);

  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2, height / 2 - height * 0.022);
  pop();

  for (let j = 0; j <= cols; j++) {
    xoff = 0;
    for (let i = 0; i <= rows; i++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let noiseAngle = map(noise(xoff, yoff), 0, 1, 0, 4);
      let shapeSize = map(noise(xoff, yoff), 0, 1, -10, cW * 2.5);
      let inShapeSize = map(noise(xoff, yoff), 0, 1, cW * 2.5, -10);

      let pixel = get(x, y);

      // strokeWeight(sW);

      noStroke();
      strokeWeight(sW);

      push();
      translate(x, y);
      // stroke(255, 220);
      // rotate(noiseAngle);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        // strokeWeight(4);
        // stroke(130, 90, 40);
        stroke("blue");
        // square(0, 0, inShapeSize);
        // stroke("blue");
        // noStroke();
        push();
        rotate(-45);
        line((inShapeSize / 2) * -1, 0, inShapeSize / 2, 0);
        pop();
        // strokeWeight(outStrokeWeight);
      } else {
        // rotate(-noiseAngle);
        // rotate(noiseAngle / 10);
        // square(0, 0, outSquareSize);
        // square(0, 0, shapeSize);
      }
      stroke("red");
      rotate(45);
      line((shapeSize / 2) * -1, 0, shapeSize / 2, 0);
      pop();

      xoff += noiseInc;
    }
    yoff += noiseInc;
  }

  foff += 0.04;
}
