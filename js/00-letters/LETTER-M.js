// M (2022.03.19)

let bgCol = [250, 255, 250];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];
let fgCol = [254, 246, 77];

let c1;
let c2;

let angle = 0;

let randomOffset = 20;

let surrounding = 300;

let letter = "M";

margin = 100;

function setup() {
  createCanvas(postW, postH);

  c1 = "grey";
  c2 = "black";
}

function draw() {
  // Text
  background(bgCol[0], bgCol[1], bgCol[2]);

  let pointX = map(cos(angle), -1, 1, margin, width - margin);
  let pointY = map(sin(angle), -1, 1, height / 2, height / 2 - 40);

  let points = groundbeatOutline.textToPoints(
    letter,
    (width / 2) * 0.22,
    (height / 2) * 1.6,
    width * 0.9,
    {
      sampleFactor: 0.03,
    }
  );

  points.forEach((p) => {
    let colorAmt = map(p.y, margin, height - margin, 0, 1);

    const fillColor = lerpColor(color(c1), color(c2), colorAmt);

    fill(fillColor);
    noStroke();
    for (let i = 0; i < 20; i++) {
      let x;
      let y;
      if (
        p.x < pointX + surrounding &&
        p.x > pointX - surrounding &&
        p.y < pointY + surrounding &&
        p.y > pointY - surrounding
      ) {
        x = p.x + random(-randomOffset * 0.9, randomOffset * 0.9);
        y = p.y + random(-randomOffset * 0.9, randomOffset * 0.9);
      } else {
        x = p.x + random(-randomOffset * 5, randomOffset * 5);
        y = p.y + random(-randomOffset * 5, randomOffset * 5);
      }
      circle(x, y, 5);
    }

    noFill();
    stroke(0);
    strokeWeight(50);
    point(pointX, pointY);
    strokeWeight(5);
    ellipse(width / 2, height / 2 - 20, width - margin * 2, 40);
  });

  angle += 0.03;

  // noLoop();
}
