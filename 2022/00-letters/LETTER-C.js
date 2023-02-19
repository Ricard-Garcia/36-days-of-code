// C (2022.03.09)

let bgCol = [83, 228, 237];
// let fgCol = [255, 0, 0];
let ltCol = [bgCol[0] + 1, bgCol[1] + 1, bgCol[2] + 1];

let fgCol = [20, 120, 140];

let x;
let y;
let angle = 90;
let radius = 20;

let path = [];

margin = -200;

function setup() {
  createCanvas(storyW, storyH);

  frameRate(120);

  background(bgCol[0], bgCol[1], bgCol[2]);
  textFont(groundbeatOutline);
  textAlign(CENTER, CENTER);
  textSize(width * 0.9);
  fill(ltCol[0], ltCol[1], ltCol[2]);
  text("C", width / 2 - 30, height / 2 - height * 0.05);

  x = width / 2;
  y = height / 2;

  path.push({ x: x, y: y });
}

function draw() {
  const yPos = map(sin(angle), -1, 1, -radius, radius);
  const xPos = map(cos(angle), -1, 1, -radius, radius);

  let pixel = get(width / 2 + xPos, height / 2 + yPos);

  if (pixel[0] === ltCol[0] && pixel[1] === ltCol[1] && pixel[2] === ltCol[2]) {
    stroke(250, 250, 255);
    strokeWeight(20);
  } else {
    stroke(fgCol[0], fgCol[1], fgCol[2]);
    strokeWeight(4);
  }

  point(width / 2 + xPos, height / 2 + yPos);

  let circlePerimeter = PI * (radius * 2);
  console.log(circlePerimeter);
  let angleInc = circlePerimeter / 600;

  if (radius * 2 >= width - margin * 2) {
    noLoop();
  } else {
    radius += 0.3;
    angle += 600;
  }
}
