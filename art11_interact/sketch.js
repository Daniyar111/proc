/*
Colorful smoke

A simple smoke effect.

jasonlabbe3d.com
twitter.com/russetPotato
*/

var particles = [];
var maxAge = 60;
var globalHue = 0;
var pos;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	textAlign(CENTER);
	textSize(20);
	pos = new p5.Vector(width / 2, height / 2);
}

function draw() {
	blendMode(BLEND);
  background(0);
  blendMode(SCREEN);
	
	let vector = new p5.Vector(pos.x, pos.y);
	pos = p5.Vector.lerp(pos, new p5.Vector(mouseX, mouseY), 0.05);
	vector.sub(pos.x, pos.y);
	if (vector.mag() > 1) {
		particles.push(new Particle(pos.x, pos.y));
	}
	
	if (frameCount % 30 == 0) {
		globalHue = random(255);
	}
	
	for (let i = particles.length -1; i > -1; i--) {
		if (i == particles.length - 1) {
			continue;
		}
		
		let opacity = map(particles[i].age, 0, maxAge, 0, 255);  // From opaque to transparent.
		let offset = (1 - (particles[i].age / float(maxAge))) * 50  * particles[i].offsetVariance;  // Have it rise the longer it's alive.
		
		stroke(0, opacity);
		strokeWeight(map(particles[i].age, 0, maxAge, 160, 10) * particles[i].sizeVariance);  // From small to bigger size.
		drawingContext.shadowColor = color(particles[i].hue, 100, 200, opacity);
		drawingContext.shadowBlur = map(particles[i].age, 0, maxAge, 60 * particles[i].sizeVariance, 1);  // From small to large blur.
		
		line(
			particles[i].pos.x, particles[i].pos.y - offset, 
			particles[i + 1].pos.x, particles[i + 1].pos.y - offset);
		
		particles[i].age -= 0.5;
		if (particles[i].age <= 0) {
			particles.splice(i, 1);
		}
	}
	
	drawingContext.shadowBlur = 0;
	// fill(255);
	// text("Move the mouse around", width / 2, 40);
}