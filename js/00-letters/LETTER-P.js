// P (2022.03.22)

let bgCol = [240, 70, 100];
let fgCol = [254, 246, 77];

let pointIndex = 0;

let pointNum = 1;

let letter = "P";

let divisions = 19;

let lineWeight = 20;

let refPointStep;

let points;

function setup() {
  createCanvas(postW, postH);

  c1 = "grey";
  c2 = "black";
  background(bgCol[0], bgCol[1], bgCol[2]);
  // Text
  points = groundbeatBlack.textToPoints(
    letter,
    (width / 2) * 0.42,
    (height / 2) * 1.6,
    width * 0.9,
    {
      sampleFactor: 0.27,
    }
  );

  refPointStep = floor(points.length / divisions);
  console.log(refPointStep);

  points.forEach((p, i) => {
    if (i % refPointStep === 0) {
      textAlign(CENTER, CENTER);
      fill("black");
      text(pointNum, p.x, p.y);
      pointNum++;
    }
  });
}

function draw() {
  const p = points[pointIndex];
  strokeWeight(lineWeight);

  if (pointIndex < points.length) {
    stroke("whitesmoke");
    point(p.x, p.y);
  } else {
    noLoop();
  }

  for (let i = 0; i < pointIndex; i++) {
    if (i % refPointStep === 0) {
      let p = points[i];
      stroke("black");
      fill("white");
      circle(p.x, p.y, lineWeight * 2);
    }
  }

  pointIndex++;
  // noLoop();
}
