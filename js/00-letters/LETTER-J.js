// E (2022.03.12)

let bgCol = [250, 10, 100];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [240, 250, 250];

let cols = 34;
let rows = cols;
let cW;
let cH;

let horizontal = false;

let stepInc = 6;

let cR;
let cM;

let circleRows = [];
let circleCols = [];

margin = 0;

let letter = "J";

function setup() {
  createCanvas(postW, postH);

  cW = (width - margin * 2) / cols;
  cH = (height - margin * 2) / rows;

  cM = (cH * 0.2) / 2;
  cR = cH / 2;

  for (let i = 0; i <= rows + 1; i++) {
    let r = {
      r: cR - cM,
    };

    if (i % 2 === 0) {
      r.location = createVector(margin + cR, cH * i + cM * 2);
      r.origin = createVector(0, cH * i + cM * 2);
      r.side = "left";
    } else {
      r.location = createVector(width - margin - cR, cH * i - cH + cM * 2);
      r.origin = createVector(width, cH * i - cH + cM * 2);

      r.side = "right";
    }

    circleRows.push(r);
  }

  for (let i = 0; i < cols; i++) {
    let c = {
      r: cR - cM,
    };

    if (i % 2 === 0) {
      c.location = createVector(cW * i + cM * 2 + 24, margin + cR);
      c.origin = createVector(cW * i + cM * 2 + 24, 0);
      c.side = "top";
    } else {
      c.location = createVector(
        cW * (i - 1) + cM * 2 + 24,
        height - margin - cR
      );
      c.origin = createVector(cW * (i - 1) + cM * 2 + 24, height);
      c.side = "bottom";
    }

    circleCols.push(c);
  }
}

function draw() {
  background(bgCol[0], bgCol[1], bgCol[2]);
  // Text
  textFont(groundbeatBlack);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  noStroke();
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text(letter, width / 2 - 25, height / 2 - height * 0.07);

  noStroke();
  fill(fgCol[0], fgCol[1], fgCol[2]);

  if (horizontal) {
    circleRows.forEach((r) => {
      push();
      noFill();
      strokeWeight(cH - cM * 2);
      stroke(fgCol[0], fgCol[1], fgCol[2]);
      line(r.origin.x, r.origin.y, r.location.x, r.location.y);
      pop();

      circle(r.location.x, r.location.y, r.r * 2);
      // rect(r.location.x, r.location.y, cH, cH);
      if (r.side === "left") {
        pixel = get(r.location.x + r.r * 2, r.location.y);
      } else {
        pixel = get(r.location.x - r.r * 2, r.location.y);
      }

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        r.location.x -= 0;
      } else {
        if (r.side === "left") {
          r.location.x += stepInc;
        } else {
          r.location.x -= stepInc;
        }
      }
    });
  } else {
    circleCols.forEach((c, i) => {
      push();
      noFill();
      strokeWeight(cH - cM * 2);
      stroke(fgCol[0], fgCol[1], fgCol[2]);
      line(c.origin.x, c.origin.y, c.location.x, c.location.y);
      pop();

      circle(c.location.x, c.location.y, c.r);
      // rect(c.location.x, c.location.y, cW, cW);
      if (c.side === "top") {
        pixel = get(c.location.x, c.location.y + c.r * 2);
      } else {
        pixel = get(c.location.x, c.location.y - c.r * 2);
      }

      if (
        pixel[0] === ltCol[0] &&
        pixel[1] === ltCol[1] &&
        pixel[2] === ltCol[2]
      ) {
        c.location.y -= 0;
      } else {
        if (c.side === "top") {
          c.location.y += stepInc;
        } else {
          c.location.y -= stepInc;
        }
      }

      if (i === circleCols.length - 1) {
        // noLoop();
        if (circleCols[i].location.y + c.r * 2 < 0) {
          console.log("Stopped");
          noLoop();
        }
      }
    });
  }

  // noLoop();
}
