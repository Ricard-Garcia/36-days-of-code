// G (2022.03.13)

// Colors
let bgCol = [250, 250, 250];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [10, 10, 10];

// Units
margin = -16;

let cols = 30;
let rows = cols;
let dW;
let dH;
let dMargin;

let currRow = 0;
let currCol = 0;

let dicesArr = [];

function setup() {
  createCanvas(postW, postH);

  dW = (width - margin * 2) / cols;
  dH = (height - margin * 2) / rows;
  dMargin = dW * 0.15;

  for (let i = 0; i < rows; i++) {
    dicesArr[i] = [];
  }
}

function draw() {
  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text("G", width / 2 - 30, height / 2 - height * 0.05);

  let y = margin + dH * currRow + dMargin;
  let x = margin + dW * currCol + dMargin;

  let pixel = get(x - dMargin, y - dMargin);

  let dNum;
  if (pixel[0] === ltCol[0] && pixel[1] === ltCol[1] && pixel[2] === ltCol[2]) {
    dNum = floor(random(4, 7));
  } else {
    dNum = floor(random(1, 2));
  }
  let dice = new Dice(x, y, dW - dMargin * 2, dH - dMargin * 2, dNum);
  dicesArr[currRow][currCol] = dice;

  if (frameCount % cols === 0 && frameCount !== 0) {
    currRow++;
    currCol = -1;
  }

  if (dicesArr[cols - 1] !== undefined) {
    if (dicesArr[cols - 1].length === cols) {
      noLoop();
    }
  }
  dicesArr.forEach((row) => {
    row.forEach((dice) => {
      dice.show();
    });
  });

  currCol++;
}

class Dice {
  constructor(x, y, w, h, num = 4) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.num = num;

    this.face = [
      ["-", "-", "-"],
      ["-", "X", "-"],
      ["-", "-", "-"],
    ];

    switch (this.num) {
      case 2:
        this.face = [
          ["-", "-", "X"],
          ["-", "-", "-"],
          ["X", "-", "-"],
        ];
        break;
      case 3:
        this.face = [
          ["-", "-", "X"],
          ["-", "X", "-"],
          ["X", "-", "-"],
        ];
        break;
      case 4:
        this.face = [
          ["X", "-", "X"],
          ["-", "-", "-"],
          ["X", "-", "X"],
        ];
        break;
      case 5:
        this.face = [
          ["X", "-", "X"],
          ["-", "X", "-"],
          ["X", "-", "X"],
        ];
        break;
      case 6:
        this.face = [
          ["X", "-", "X"],
          ["X", "-", "X"],
          ["X", "-", "X"],
        ];
        break;
      default:
        break;
    }

    this.margin = this.w * 0.25;
    this.pointW = (this.w - this.margin * 2) / 2;
    this.pointH = (this.h - this.margin * 2) / 2;
  }

  show() {
    stroke(fgCol[0], fgCol[1], fgCol[2]);
    strokeWeight(this.w * 0.02);
    noFill();
    rect(this.x, this.y, this.w, this.h);

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let cell = this.face[i][j];
        if (cell === "X") {
          stroke(fgCol[0], fgCol[1], fgCol[2]);
          strokeWeight(this.w * 0.2);
          point(
            this.x + this.pointW * j + this.margin,
            this.y + this.pointH * i + this.margin
          );
        }
      }
    }
  }
}
