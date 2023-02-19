// Q (2022.03.23)

let bgCol = [3, 3, 5];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 77];

let letter = "R";

let c1;
let c2;

margin = -30;

let letterIndex = 0;
let letters = [
  " ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
];

let cols = 32;
let rows = cols;
let rowsNum = 0;
let setpInc = 8;
let angleInc;
let cW;
let cH;
let cM;

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cH * 0.65;

  c1 = color(warmColors[0]);
  c2 = color("blue");
  background(bgCol[0], bgCol[1], bgCol[2]);
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2], 30);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2], ltCol[3]);
  text(letter, width / 2, height / 2 - 50);

  fill(0);
  noStroke();
  textSize(cW);

  for (let i = 0; i <= rowsNum; i++) {
    letterIndex = 0;

    for (let j = 0; j <= cols; j++) {
      letterIndex = rowsNum - i - j;
      let x = cW * j + margin;
      let y = cH * i + margin;

      let amtColor = map(y, margin, height - margin, 0, 1);

      let rowColor = lerpColor(c1, c2, amtColor);
      fill(rowColor);

      let pixel = get(x + 15, y + 15);
      if (
        pixel[0] !== ltCol[0] &&
        pixel[1] !== ltCol[1] &&
        pixel[2] !== ltCol[2] &&
        // pixel[3] === ltCol[3] * 2 &&
        letterIndex > letters.indexOf(letter)
      ) {
        text(letter, x, y);
      } else {
        text(letters[letterIndex], x, y);
      }
    }
    letterIndex++;
  }
  if (rowsNum < rows * 4) {
    rowsNum += 1;
  } else {
    console.log("Stopped");
    noLoop();
  }
}
