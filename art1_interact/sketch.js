//Global Variables
var sound, amplitude; //sound - plays the song, amplitude - accesses amplitude values of sound
var p = [];						//array of particles

function preload(){
	//Funny Song. (2018). [Online]. Retrieved from https://www.bensound.com/royalty-free-music/track/funny-song
  sound = loadSound('bensound-funnysong.mp3'); 																											//loading song
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	sound.loop();
  fft = new p5.FFT();
	amplitude = new p5.Amplitude();
	noCursor();
	background(0);
}

function draw() {
	background(0, 5);
	
	var spectrum = fft.analyze();
	colorMode(HSB, 512, 1024, 1024, 100);
	p.push(new Particle(color(colourChoose(), 1024, 1024)));
	
	var level = amplitude.getLevel();
	//mapping the amplitude from 0 - 1, to 0 - 200 as it'll be used for the size of the brush
  var size = map(level, 0, 1, 0, 200);																															
	
	for (var i = 0; i < p.length; i ++) {
		//Creating a variable to use so that if there are more particles than the samples(1024)
		/* spectrum will not have an arrayindexoutofbounds error */
		var freqId = i % 1024;																																					
		//Created a variable that will use the frequency as the particle's speed
		var spec = map(spectrum[freqId], 0, 255, 0, 0.01);																							
		p[i].display();
		p[i].speedFactor = spec;
		p[i].update();
		//If the distance from the position of the particle to it's target destination is less than the size of the amplitude
		if (dist(p[i].pos.x, p[i].pos.y, p[i].targetPos.x, p[i].targetPos.y) < size) {
				//Destroy the particle 
				/*Used for visual and optimisation purposes*/
				p.splice(i, 1);																																							
		}
	}
	
	//Amplitude Cursor
	push();
	stroke(colourChoose(), 1024, 1024, 100);
	strokeWeight(size);
	line(pmouseX, pmouseY, mouseX, mouseY);
	pop();
}

//Analyses the frequency of a song to produce the colour of the song at a particular frame ranging from 0 - 1024
function colourChoose() {
		var spectrum = fft.analyze();
		var specHue = 0;
		//Go through all frequency samples and add them to get the total value
		for (var i = 0; i < spectrum.length; i++) {
			/*Variable created mapping the frequency values from 0-255 to 0-1 so that the maximum value for the total will be 1024*/
			var m = map(spectrum[i], 0, 255, 0, 1);
			specHue += m;
		}
		return specHue;
}

//Particle class
//col - colour of the particle
function Particle(col) {
	
	//Initialising where the particle will spawn when the particle is created
	//Returns a vector that is on one of the four edges of the screen
	this.init = function() {																																	
		var rand = floor(random(0, 4));
		var vec;
		if (rand == 0) {
			//Top
			vec = createVector(random(width), 0);																													
		} else if (rand == 1) {
			//Bottom
			vec = createVector(random(width), height);																										
		} else if (rand == 2) {
			//Left
			vec = createVector(0, random(height));																												
		} else {
			//Right
			vec = createVector(width, random(height));																										
		}
		return vec;
	}
	
	/*Variables are called after the init() function as it causes an error for the pos variable*/
	this.pos = this.init();
	this.targetPos = createVector(mouseX, mouseY);
	/*Will be the colour of the frequency when the particle is created */
	this.col = col;
	this.speedFactor;
	
	//Updates the position of the particle as well as the targetPosition
	this.update = function() {
		//Easing formula - as the particle moves closer to the target, slow down the speed of the particle
		this.pos.x += (this.targetPos.x - this.pos.x) * this.speedFactor;
		this.pos.y += (this.targetPos.y - this.pos.y) * this.speedFactor;
		//targetPos = mouse position
		this.targetPos.x = mouseX;
		this.targetPos.y = mouseY;
	}
	
	//Display the particle
	this.display = function() {
		fill(this.col);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 10);
	}
	
}