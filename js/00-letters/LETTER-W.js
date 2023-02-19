// U (2022.03.27)

let bgCol = [250, 250, 254];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 240];

let letter = "W";

margin = 0;

let cols = 57;
let rows = cols;
let cW;
let cH;

let pVariation = 10;
let stepSize = 1;

let sW = 14;

let letterStars = [];

function setup() {
  createCanvas(postW, postH);
  rectMode(CENTER);

  angleMode(DEGREES);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;
  cM = cW * 0.4;

  noStroke();
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 20, height / 2 - height * 0.054);

  for (let j = 0; j <= cols; j++) {
    for (let i = 0; i <= rows; i++) {
      let x = cW * j + margin;
      let y = cH * i + margin;

      let pixel = get(x, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        let star = new Star(x, y);
        letterStars.push(star);
      }
    }
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);

  stroke(0);
  strokeWeight(10);

  letterStars.forEach((s) => {
    s.show();
    s.timesVisited = 0;

    for (let i = 0; i < letterStars.length; i++) {
      let oS = letterStars[i];

      if (oS.timesVisited < oS.maxTimesVisited) {
        let starDistance = dist(
          s.location.x,
          s.location.y,
          oS.location.x,
          oS.location.y
        );

        if (starDistance < width * 0.05) {
          push();
          strokeWeight(1);
          line(s.location.x, s.location.y, oS.location.x, oS.location.y);
          pop();
          oS.updateTimesVisited();
        }
      }
    }
  });

  // if (frameCount === 30) {
  //   noLoop();
  // }

  // noLoop();
}

function rPos(maxValue = pVariation) {
  return random(-maxValue, maxValue);
}

class Star {
  constructor(x, y, sSize = stepSize) {
    this.location = new p5.Vector(x, y);
    this.step = new p5.Vector(rPos(sSize), rPos(sSize));
    this.timesVisited = 0;
    this.maxTimesVisited = 3;
  }

  show() {
    point(this.location.x, this.location.y);
    this.update();
  }

  update() {
    this.location.x += this.step.x;
    this.location.y += this.step.y;
  }

  updateTimesVisited() {
    this.timesVisited++;
  }
}
