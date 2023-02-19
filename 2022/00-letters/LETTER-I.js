// I (2022.03.15)

margin = 30;

let fgCol = [223, 14, 0];

let letter = "I";
let stepInc = 40;
let cD = 10;

let angle1 = 90;
let angle2 = 7.38;

let angleInc = 0.007;
let yFactor = 3;

let leftColor = [127, 255, 212];
let rightColor = [250, 100, 100];
let bgCol = [20, 10, 40];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let c1 = leftColor;
let c2 = rightColor;

function setup() {
  createCanvas(postW, postH);

  background(bgCol[0], bgCol[1], bgCol[2]);
}

function draw() {
  // Text
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2, height / 2 - height * 0.04);

  // Amgles
  let x1 = map(cos(angle1 + 360), -1, 1, margin, width - margin);
  let y1 = map(sin(angle1 * yFactor), -1, 1, margin, height - margin);

  let x2 = map(cos(angle2 - 360), -1, 1, margin, width - margin);
  let y2 = map(sin(angle2 * yFactor), -1, 1, margin, height - margin);

  let strokeColor = [];
  let colorAmt = map(sin(angle2 * yFactor + 3), -1, 1, 0, 1);

  for (let c = 0; c < 3; c++) {
    let intC = lerp(c1[c], c2[c], colorAmt);
    strokeColor.push(intC);
  }

  for (let x = margin; x < width - margin; x += stepInc) {
    for (let y = margin; y < height - margin; y += stepInc) {
      let pixel = get(x, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        strokeWeight(0.5);
        stroke(strokeColor[0], strokeColor[1], strokeColor[2], 10);
        // stroke(leftColor[0], leftColor[1], leftColor[2], 10);
        line(x + random(10), y + random(10), x1 + random(10), y1 + random(10));

        // stroke(255, 10);
        // stroke(rightColor[0], rightColor[1], rightColor[2], 10);
        line(x + random(10), y + random(10), x2 + random(10), y2 + random(10));
      }
    }
  }

  // noLoop();

  angle1 += angleInc;
  angle2 -= angleInc;
}
