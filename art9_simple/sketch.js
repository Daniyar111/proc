var colors = "19381f-eee82c-91cb3e-53a548-4c934c-fff".split("-").map(a=>"#"+a)
function distort(p){
	return createVector(p.x+sin(p.y/3)*3+sin(p.y/30)*10 + random(-1,1)+cos(p.x/30)+noise(p.x/500,p.y/50,0)*50,
										 	p.y+sin(p.x/3)*3+sin(p.x/30)*10+ random(-1,1)+cos(p.y/30)+noise(p.x/500,p.y/50,1000)*50)
}

class Particle{
	constructor(args){
		let def = {
			p: createVector(0,0),
			v: createVector(0,0),
			a: createVector(0,0),
			r: random(200)*random(1)*random(1),
			fadeRate: random(0.985,0.995),
			distort: random()<0.1,
			color: color(random(colors)),
			strokeColor: color(random(colors))
		}
		if (random()<0.5){
			def.strokeColor = color(0,0,0,0)
		}
		if (random()<0.01){
				def.color = color("#327dff")
		}
		Object.assign(def,args)
		Object.assign(this,def)
	}
	update(){
		this.p.add(this.v)
		this.v.add(this.a)
		this.r*=this.fadeRate
		

		let delta = this.p.copy().sub(createVector(width/2,height/2))
		if (delta.mag()<500){
			this.v.add(delta.normalize().mult(-0.01))
		}	
	}
	draw(){
		bgGraphic.push()
			bgGraphic.translate(this.distort?distort(this.p):this.p)
			// noStroke()
			bgGraphic.stroke(this.strokeColor)
			bgGraphic.fill(this.color)
		
		  this.color.setRed( this.color._getRed()+1) 
			bgGraphic.ellipse(0,0,this.r)

		bgGraphic.pop()
	}
	isInBoundary(){
		let dev = 50
		return this.p.x >0 - dev && this.p.x < width + dev &&
					 this.p.y > 0 - dev && this.p.y<height + dev	
	}
}


let overAllTexture
let bgGraphic
var particles = []
function setup() {
	createCanvas(windowWidth, windowHeight);
	bgGraphic = createGraphics(width,height);
	background(200)
	fill(0);
	rect(0,0,width,height)
	mouseX = width/3
	mouseY = height/3
	bgGraphic.drawingContext.shadowColor = color(0,0,0,4)
	bgGraphic.drawingContext.shadowBlur = 5
	
	
	// noprotect
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	// noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(100,noise(i/30,o/30,i*o/50)*random([0,50,100,150])))
		}
	}
	overAllTexture.updatePixels()
}

function draw() {

	for(var i=0;i<1;i++){
		particles.push(new Particle({
			p: createVector(mouseX,mouseY),
			v: p5.Vector.random2D().mult(random(3))
		}))
	}
	particles = particles.filter(p=>p.isInBoundary() && p.r>5)
	particles.forEach(particle=>{
		particle.update()
		particle.draw()
	})
	// text(particles.length,50,50)
	
	image(bgGraphic,0,0)
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
	// ellipse(mouseX, mouseY, 20, 20);
}

function keyPressed(){
	if (key==' '){
		save()
	}
}


