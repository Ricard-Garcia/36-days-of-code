// 4 (2022.04.06)

let isNegative = false;
let bgCol;
let fgCol;
if (isNegative) {
  bgCol = [13, 15, 23];
  fgCol = [245, 245, 254];
} else {
  bgCol = [245, 245, 254];
  fgCol = [13, 15, 23];
}

margin = 0;
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let letter = "6";

let cols = 43;
let rows = cols * 5;

let cW, cH;

let angleY = 0;
let angleX = 90;
let angleInc = 0.03;
let translationOff = 120;

let sW = 20;

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  let letterXoff = map(sin(angleY), -1, 1, -translationOff, translationOff);
  let letterYoff = map(cos(angleX), -1, 1, -translationOff, translationOff);

  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(
    letter,
    width / 2 - 20 + letterXoff,
    height / 2 - height * 0.035 + letterYoff
  );

  stroke(fgCol[0], fgCol[1], fgCol[2]);
  strokeWeight(sW);

  for (let j = 0; j <= cols; j++) {
    let x = j * cW + margin;

    if (j % 2 !== 0) {
      line(x, 0, x, height);
    } else {
      for (let i = 0; i <= rows; i++) {
        let y = i * cH + margin;
        let pixel = get(x, y + sW + 5);
        if (
          pixel[0] === ltCol[0] &&
          pixel[1] === ltCol[1] &&
          pixel[2] === ltCol[2]
        ) {
          push();
          // stroke("red");
          point(x, y);
          pop();
        }
      }
    }
  }

  angleY += angleInc;
  angleX += angleInc * 2;
}
