// E (2022.03.12)

let bgCol = [0, 5, 27];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 77];

let cols = 30;
let rows = cols;
let cW;
let cH;

margin = -20;

let maxCircleSize = 18;

let startColAngle = 90;

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
}

function draw() {
  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text("E", width / 2 - 10, height / 2 - height * 0.05);

  let rowAngle = 0;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let rowSin = sin((startColAngle + rowAngle - j / 3 - i) * 1);
      let cSize = map(rowSin, -1, 1, 0, maxCircleSize);
      let cLetterSize = map(rowSin, -1, 1, maxCircleSize, 0);
      let x = cW * i + margin + cW / 2;
      let y = cH * j + margin + cH / 2;

      rectMode(CENTER);

      // fill(fgCol[0], fgCol[1], fgCol[2]);
      fill("whitesmoke");
      let pixel = get(x, y);
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        noStroke();
        circle(x, y, cLetterSize * 4);
        // rect(x, y, cLetterSize * 4, cLetterSize * 4);
      } else {
        // fill(30);
        circle(x, y, cSize);
        // rect(x, y, cLetterSize, cLetterSize);
      }
      startColAngle += 0.00005;
    }
    rowAngle += 32;
  }

  // noLoop();
}
