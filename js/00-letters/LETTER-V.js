// V (2022.03.27)

let bgCol = [40, 5, 5];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let letter = "V";

let word = " vendetta ";
let initialWords = 30;

let fontSize = 18;

let wordDecrease = 1;

let isNegative = true;
let isReversed = false;
let rowWords = isReversed ? 1 : initialWords;
let initialRowWords = rowWords;

let showGuides = false;

let cols;
let rows;

let originTextY;

let c1;
let c2;

margin = 100;

if (isNegative) {
  foregroundColor = "yellow";
  backgroundColor = 0;
} else {
  foregroundColor = 0;
  backgroundColor = "yellow";
}

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / (word.length * rowWords - 1);
  cH = (height - margin * 2) / initialWords;

  rows = (height - margin * 2) / cH;
  originTextY = -360;

  c1 = color("crimson");
  c2 = color("LemonChiffon");
}

function draw() {
  rowWords = initialRowWords;
  background(bgCol[0], bgCol[1], bgCol[2]);
  noStroke();
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2, originTextY);

  textFont("DIN Alternate");
  noStroke();

  push();
  strokeWeight(4);
  stroke(0);
  point(width / 2, height / 2);
  pop();
  // Rows
  for (let i = 0; i < rows; i++) {
    let fSize;
    if (isReversed) {
      fSize = map(i, 0, rows, 24, 5);
    } else {
      fSize = map(i, 0, rows, 5, 24);
    }
    textSize(fSize);

    let inter = map(i, 0, rows, 0, 1);

    let c = lerpColor(c1, c2, inter);
    fill(c);
    // Words
    for (let w = 0; w < rowWords; w++) {
      let originW = margin + cW * word.length * w;
      // Letters
      for (let l = 0; l < word.length; l++) {
        let x = cW * l + originW;
        let y = cH * i + margin;

        let pixel = get(x, y);

        if (
          pixel[0] !== ltCol[0] &&
          pixel[1] !== ltCol[1] &&
          pixel[2] !== ltCol[2]
        ) {
          text(word[l].toUpperCase(), x, y);
        }
      }
    }

    if (isReversed) {
      rowWords += wordDecrease;
    } else {
      rowWords -= wordDecrease;
    }
    cW = (width - margin * 2) / (word.length * rowWords - 1);
  }

  if (originTextY >= height / 2 - 60) {
    noLoop();
  } else {
    originTextY += 70;
  }

  // noLoop();
}
