// D (2022.03.10)

let bgCol = [55, 200, 150];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let fgCol = [240, 240, 250];

let x;
let y;

let cols = 30;
let rows = 34;
let cW;
let cH;

let point;
let circleRadius;
let angle = 90;

margin = -30;

function setup() {
  createCanvas(postW, postH);

  circleRadius = width * 0.7;

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text("D", width / 2 - 10, height / 2 - height * 0.05);

  noFill();
  circle(width / 2, height / 2, circleRadius * 2);

  let pointY = height / 2;
  // let pointY = map(sin(angle), -1, 1, margin, height - margin);
  let pointX = map(cos(angle), -1, 1, margin, width - margin);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = cW * i + margin;
      let y = cH * j + margin;

      let pixel = get(x, y);

      let sW = map(dist(x, y, pointX, pointY), 0, width * 0.82, 40, 1);
      let sW2 = map(dist(x, y, pointX, pointY), 0, width, 1, 40);

      strokeCap(SQUARE);
      strokeCap(ROUND);
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        stroke(fgCol[0], fgCol[1], fgCol[2]);
        strokeWeight(sW);
        line(x, y, x + cW * 0.2, y);
        push();
        // stroke(254, 148, 3);
        strokeWeight(sW * 0.6);
        line(x, y, x + cW * 0.2, y);
        pop();
      } else {
        stroke(4, 28, 0);
        strokeWeight(sW2);
        line(x, y, x + cW * 0.2, y);
      }
    }
  }
  angle += 0.05;
  // noLoop();
}
