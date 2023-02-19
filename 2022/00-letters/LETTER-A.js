// A (2022.03.07)

let c;
let numCircles = 3;
let circles;
let cM = 0;

let cpf = 40;

let randC = getRandomColor(colors);
let spots; // Possible Vector (x, y) spots

let img;

margin = 0;

let whitePixels = false;
let monochrom = false;

function preload() {
  img = loadImage("../../assets/2022-01-30-asset-extra-2.jpg");
}

function setup() {
  createCanvas(1200 + margin * 2, 1200 + margin * 2);

  img.loadPixels();
  spots = [];
  circles = [];

  // Loop through image's pixels
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixelIndex = x + y * img.width;

      let pixelColor = img.pixels[pixelIndex * 4];
      let b = brightness([pixelColor]);

      // White pixel

      if (whitePixels) {
        if (b > 1) {
          spots.push(createVector(x + margin, y + margin));
        }
      } else {
        if (b < 1) {
          spots.push(createVector(x + margin, y + margin));
        }
      }
    }
  }

  for (let i = 0; i < numCircles; i++) {
    c = new Circle(
      random(margin, width - margin),
      random(margin, height - margin)
    );
    circles.push(c);
  }
}

function draw() {
  background(0);

  const total = cpf; // Circles per frame
  let count = 0; // Count of circles per frame
  let attempts = 0;

  while (count < total) {
    let newC = newCircle();

    if (newC != null) {
      circles.push(newC);
      count++;
    }

    attempts++;

    if (attempts > 1000) {
      noLoop();
      console.log("Finished");
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    if (c.growing) {
      if (c.edges()) {
        c.growing = false;
      } else {
        for (let o = 0; o < circles.length; o++) {
          let cO = circles[o];
          if (c != cO) {
            let d = dist(c.x, c.y, cO.x, cO.y);
            if (d - 2 < c.r + cO.r + cM) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }

    c.show();
    c.grow();
  }
}

function newCircle() {
  let r = int(random(spots.length));
  let spot = spots[r];
  let x = spot.x;
  let y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r + 4) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
    this.color = random([color(7, 155, 97), "whitesmoke"]);
  }

  show() {
    noStroke();
    if (monochrom) {
      fill(15, 20, 24);
    } else {
      fill(this.color);
    }
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  grow() {
    if (this.growing) {
      this.r += 1;
    }
  }

  edges() {
    return (
      this.x + this.r >= width - margin ||
      this.x - this.r <= margin ||
      this.y + this.r >= height - margin ||
      this.y - this.r <= margin
    );
  }
}
