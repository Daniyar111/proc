function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.branchWeight = 1;

  this.jitter = function() {
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  };

  this.show = function() {
    // stroke('#4d4d00');
    stroke(255);
    
    strokeWeight(this.branchWeight);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };

  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(PI / 6);
    dir.mult(0.77);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  };
  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-PI / 4);
    dir.mult(0.77);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  };
}
