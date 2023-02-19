// I (2022.03.15)

margin = 0;

let bgCol = [100, 20, 0];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [223, 14, 0];

let letter = "I";
let stepInc = 14;
let cD = 10;

let angle1 = -90;
let angle2 = -90;
let angle3 = 90;
let angle4 = 90;

let angleInc = 0.2;

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
  let x1 = map(cos(angle1), -1, 1, margin, width / 2 - margin);
  let y1 = map(sin(angle1), -1, 1, margin, height / 2 - margin);

  let x2 = map(cos(angle2), -1, 1, width / 2 + margin, height - margin);
  let y2 = map(sin(angle2), -1, 1, margin, height / 2 - margin);

  let x3 = map(cos(angle1), -1, 1, margin, width / 2 - margin);
  let y3 = map(sin(angle3), -1, 1, height / 2 + margin, height - margin);

  let x4 = map(cos(angle2), -1, 1, width / 2 + margin, height - margin);
  let y4 = map(sin(angle4), -1, 1, height / 2 + margin, height - margin);

  // noStroke();
  // strokeWeight(4);
  // fill("white");
  // circle(x1, y1, cD * 2);
  // circle(x2, y2, cD * 2);
  // circle(x3, y3, cD * 2);
  // circle(x4, y4, cD * 2);

  for (let x = margin; x < width - margin; x += stepInc) {
    for (let y = margin; y < height - margin; y += stepInc) {
      let pixel = get(x, y);

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        stroke(fgCol[0], fgCol[1], fgCol[2], 20);
        // stroke(255, 20);

        strokeWeight(0.5);
        line(x, y, x1, y1);
        line(x, y, x2, y2);
        line(x, y, x3, y3);
        line(x, y, x4, y4);
        // noStroke();
        // fill(255, 10);
        // circle(x, y, cD / 2);
      }
    }
  }

  // noLoop();

  angle1 += angleInc;
  angle2 -= angleInc;
  angle3 -= angleInc;
  angle4 += angleInc;
}
