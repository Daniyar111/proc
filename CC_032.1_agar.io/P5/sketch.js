// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

var blob;

var blobs = [];
var zoom = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 1000; i++) {
    var x = random(-width * 5, width * 5);
    var y = random(-height * 5, height * 5);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
    }
  }

  blob.show();
  blob.update();
}
