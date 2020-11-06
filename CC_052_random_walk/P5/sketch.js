// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY

var x;
var y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  background(51);
}

function draw() {
  stroke(255, 100);
  strokeWeight(8);
  point(x, y);

  var r = floor(random(4));

  switch (r) {
    case 0:
      x = x + 10;
      break;
    case 1:
      x = x - 10;
      break;
    case 2:
      y = y + 10;
      break;
    case 3:
      y = y - 10;
      break;
  }
}
