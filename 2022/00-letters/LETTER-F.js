// F (2022.03.12)

// let bgCol = [250, 180, 230];
let bgCol = [10, 10, 10];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let fgCol = [250, 250, 250];
// let fgCol = [30, 30, 30];

let rows = 20;
let cH;
let stepInc = 15;
let amplitude = 0.6;

let globalAngle = 0;
let xOffset = 0;
margin = 0;

function setup() {
  createCanvas(postW, postH);
  cH = (height - margin * 2) / rows;
}

function draw() {
  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);

  let sWBg = map(sin(globalAngle), -1, 1, 1, 17) * 2;
  let sWFg = map(sin(globalAngle), -1, 1, 17, 1) * 2;

  text("F", width / 2, height / 2 - height * 0.07);
  for (let i = 0; i < rows; i++) {
    let prevY = cH * i + cH * 0.5;
    noFill();
    strokeCap(ROUND);
    let prevX = 0;
    for (let x = 0; x < width - margin * 2; x += stepInc) {
      let pixel = get(x + margin, cH * i);
      let y = cH * i + cH * 0.5;

      // Mapping the 0,1 value of noise to height
      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        y = noise(xOffset + x) * (cH * amplitude) + cH * i + cH * 0.25;

        stroke(fgCol[0], fgCol[1], fgCol[2]);
        strokeWeight(sWFg);
        noFill();
        line(prevX, prevY, x + margin + stepInc - 5, y + margin);
      } else {
        stroke(250, 180, 230);

        strokeWeight(sWBg);
        // stroke(20);
        line(prevX, prevY, x + margin + stepInc - 5, y + margin);
      }
      prevX = x + margin + stepInc - 5;
      prevY = y + margin;
    }
  }
  xOffset += 0.1;
  globalAngle += 0.1;
  // noLoop();
}
