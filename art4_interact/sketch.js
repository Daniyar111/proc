let thold = 5;
let spifac = 1.05;
let outnum;
let drag = 0.01;
let big = 500;
let bodies;
let mX;
let mY;

function setup() {
	createCanvas(900, 450);
	bodies = new Ball()[big];
  strokeWeight(1);
  fill(255, 255, 255);
  stroke(255, 255, 255, 5);
  background(0, 0, 0);   
  smooth();
  for(let i = 0; i < big; i++) {
    bodies[i] = new Ball();
  }
}

function draw() {
  if(keyPressed) {
    saveFrame("Focus " + outnum);
    outnum++;
  }
  if(mousePressed) {
    background(0, 0, 0);
    
    mX += 0.3 * (mouseX - mX);
    mY += 0.3 * (mouseY - mY);
  }
   mX += 0.3 * (mouseX - mX);
    mY += 0.3 * (mouseY - mY);
  for(let i = 0; i < big; i++) {
    bodies[i].render();
  }
}

class Ball {
  
  constructor() {
    this.X = random(screen.width);
    this.Y = random(screen.height);
    this.w = random(1 / thold, thold);
  }
  render() {
    if(!mousePressed) {
      this.Xv /= spifac;
      this.Yv /= spifac;
    }
    this.Xv += drag * (this.mX - this.X) * this.w;
    this.Yv += drag * (this.mY - this.Y) * this.w;
    this.X += this.Xv;
    this.Y += this.Yv;
    line(this.X, this.Y, this.pX, this.pY);
    this.pX = this.X;
    this.pY = this.Y;
  }
}





// float thold = 5;
// float spifac = 1.05;
// int outnum;
// float drag = 0.01;
// int big = 500;
// ball bodies[] = new ball[big];
// float mX;
// float mY;

// void setup() {
//   // size(900, 450);
//	 fullScreen();
//   strokeWeight(1);
//   fill(255, 255, 255);
//   stroke(255, 255, 255, 5);
//   background(0, 0, 0);   
//   smooth();
//   for(int i = 0; i < big; i++) {
//     bodies[i] = new ball();
//   }
// }

// void draw() {
//   if(keyPressed) {
//     saveFrame("Focus " + outnum);
//     outnum++;
//   }
//   if(mousePressed) {
//     background(0, 0, 0);
    
//     mX += 0.3 * (mouseX - mX);
//     mY += 0.3 * (mouseY - mY);
//   }
//    mX += 0.3 * (mouseX - mX);
//     mY += 0.3 * (mouseY - mY);
//   for(int i = 0; i < big; i++) {
//     bodies[i].render();
//   }
// }

// class ball {
//   float X;
//   float Y;
//   float Xv;
//   float Yv;
//   float pX;
//   float pY;
//   float w;
//   ball() {
//     X = random(screen.width);
//     Y = random(screen.height);
//     w = random(1 / thold, thold);
//   }
//   void render() {
//     if(!mousePressed) {
//       Xv /= spifac;
//       Yv /= spifac;
//     }
//     Xv += drag * (mX - X) * w;
//     Yv += drag * (mY - Y) * w;
//     X += Xv;
//     Y += Yv;
//     line(X, Y, pX, pY);
//     pX = X;
//     pY = Y;
//   }
// }