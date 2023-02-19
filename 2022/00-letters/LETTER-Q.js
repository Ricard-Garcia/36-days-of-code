// Q (2022.03.23)

let bgCol = [250, 250, 250];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 77];

let angle = 0;

let letter = "Q";

let c1;
let c2;

margin = 30;

let cols = 22;
let rows = cols;
let setpInc = 8;
let angleInc;
let cW;
let cH;
let cM;

function setup() {
  createCanvas(postW, postH);
  // blendMode(MULTIPLY);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cH * 0.65;

  angleInc = PI / rows;

  c1 = color(0, 0);
  c2 = color(20, 20, 20);
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 + 10, height / 2 - height * 0.1);

  noFill();

  fill(255);
  noStroke();

  // Rows
  for (let i = 0; i <= rows; i++) {
    let xExtrude = map(
      cos(angle + i * -angleInc),
      -1,
      1,
      margin,
      width - margin * 2
    );

    for (let subX = 0; subX < xExtrude; subX += setpInc) {
      let x = subX + margin;
      let y = cH * i + margin;

      let pixel = get(x + cW, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        fill(c1);
      } else {
        fill(c2);
      }

      circle(x, y, cH - cM);
    }
  }

  // Cols
  for (let i = 0; i <= cols; i++) {
    let xExtrude = map(
      cos(angle + i * angleInc + PI),
      -1,
      1,
      margin,
      height - margin * 2
    );

    for (let subY = 0; subY < xExtrude; subY += setpInc) {
      let x = cW * i + margin;
      let y = subY + margin;

      let pixel = get(x + cW, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        fill(c1);
      } else {
        fill(c2);
      }

      circle(x, y, cH - cM);
    }
  }

  angle += 0.1;

  // noLoop();
}
