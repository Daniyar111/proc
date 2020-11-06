// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

let tree = [];
let leaves = [];
let leavesOnTree = [];
let axisY = 1;
let axisX = 0;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // console.log(windowWidth, windowHeight, width, height)
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 150);
  let root = new Branch(a, b);

  // strokeWeight(10);
  tree[0] = root;
  tree[0].branchWeight = 15;
}

function mousePressed() {
  // console.log(tree.length);
  if(tree.length > 8000){
    return;
  }
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      if(tree.length === 1){
        tree[i].branchWeight = 15;
      }
      else if(tree.length > 1 && tree.length < 6){
        tree[i].branchWeight = 10;
      }
      else if(tree.length >= 6 && tree.length < 100){
        tree[i].branchWeight = 4;
      }
      else if(tree.length >= 100 && tree.length < 400){
        tree[i].branchWeight = 2;
      }
      else if(tree.length >= 400){
        tree[i].branchWeight = 1;
      }

      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      if(count >= 5){
        let leaf = tree[i].end.copy();
        leavesOnTree.push(leaf);
      }
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 12) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
    leavesOnTree = [];
  }
}


function draw() {
  background(51);
  // background(img, 0, 0, windowWidth, windowHeight)
  // setGradient(0, 0, width, height, color('#66e0ff'), color('#005266'), axisY);

  for (let i = 0; i < tree.length; i++) {

    // console.log(tree[i])
    tree[i].show();

    //tree[i].jitter();
  }

  // console.log(leaves.length)

  if(count >= 5 && count < 12){
    for (let i = 0; i < leavesOnTree.length; i++) {
      fill(255, 0, 100, 100);
      noStroke();
      ellipse(leavesOnTree[i].x, leavesOnTree[i].y, 15, 15);
      // leaves[i].y += random(0, 10);
    }
  }

  if(count === 12){
    for (let i = 0; i < leaves.length; i++) {
      fill(255, 0, 100, 100);
      noStroke();
      ellipse(leaves[i].x, leaves[i].y, 15, 15);
      leaves[i].y += random(0, 25);
    }
  }
}



function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == axisY) {
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    }
  }