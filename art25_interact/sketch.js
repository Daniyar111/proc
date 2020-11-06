var cells = [];
var cellW = 15;
var cellH = 15;
var nbCellW;
var nbCellH;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  colorMode(HSB, 1);
  
  nbCellW = floor(width / cellW);
  nbCellH = floor(height / cellH);
  
  for (var i = 0; i < nbCellW*nbCellH; i ++) {
    cells.push(createVector(0, 0));
  }
}

function  draw() {
  var deltaMouse = createVector(mouseX - pmouseX, mouseY - pmouseY);
  for (var i = 0; i < nbCellW; i ++) {
    for (var j = 0; j < nbCellH; j ++) {
      var k = i+j*nbCellW;
      var x =  cellW * i + cellW/2;
      var y =  cellH * j + cellH/2;
      var d = Math.max(1, dist(mouseX, mouseY, x, y));
      
      deltaMouse.normalize();
      deltaMouse.mult(1/(d*30));
      cells[k].add(deltaMouse);
      cells[k].limit(10);
      
      var h = map(cells[k].heading(), -PI, PI, 0, 1);
      var b = min(cells[k].mag()*100, 10);
      fill(h, 1, b);
      
      rect(x, y, cellW, cellH);
      
      cells[k].mult(.98);
    }
  }
}
