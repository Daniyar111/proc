// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/BV9ny785UNc

// Written entirely based on
// http://www.karlsims.com/rd.html

// Also, for reference
// http://hg.postspectacular.com/toxiclibs/src/44d9932dbc9f9c69a170643e2d459f449562b750/src.sim/toxi/sim/grayscott/GrayScott.java?at=default

// Source Obama image
let obama;
// Resize it
let smaller;
// Giant array of images
let allImages = [];
// Corresponding brightness value
let brightness = [];
// Images by brightness
let brightImages = [];

let scl = 16;
let w, h;

function setup() {
  createCanvas(600, 749);
  obama = loadImage("obama.jpg");

  // Find all the images
  let files = listFiles(sketchPath("data/photos"));
  //allImages = new PImage[files.length-1];
  // Use a smaller amount just for testing
  allImages = new PImage[100];
  // Need brightness average for each image
  brightness = new float[allImages.length];

  // Only 256 brightness values
  brightImages = new PImage[256];

  // Deal with all the images
  for (let i = 0; i < allImages.length; i++) {

    // What's the filename?
    // Should really check to see if it's a JPG
    // Starting at +1 to ignore .DS_Store on Mac
    let filename = files[i+1].toString();

    // Load the image
    let img = loadImage(filename);

    // Shrink it down
    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();

    // Calculate average brightness
    let avg = 0;
    for (let j = 0; j < allImages[i].pixels.length; j++) {
      let b =  brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;


    brightness[i] = avg;
  }

  // Find the closest image for each brightness value
  for (let i = 0; i < brightImages.length; i++) {
    let record = 256;
    for (let j = 0; j < brightness.length; j++) {
      let diff = abs(i - brightness[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }

  // how many cols and rows
  w = obama.width/scl;
  h = obama.height/scl;

  smaller = createImage(w, h, RGB);
  smaller.copy(obama, 0, 0, obama.width, obama.height, 0, 0, w, h);
}

function draw() {
  background(0);
  smaller.loadPixels();
  // Columns and rows
  for (let x =0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      // Draw an image with equivalent brightness to source pixel
      let index = x + y * w;
      let c = smaller.pixels[index];
      let imageIndex = int(brightness(c));
      // fill(brightness(c));
      // noStroke();
      // rect(x*scl, y*scl, scl, scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }
  noLoop();
}

// Function to list all the files in a directory
function listFiles(dir) {
  let file = new File(dir);
  if (file.isDirectory()) {
    let files = file.listFiles();
    return files;
  } else {
    // If it's not a directory
    return null;
  }
}
