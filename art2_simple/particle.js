class Particle{
	constructor(args){
		let def = {
			lastP: createVector(0,0),
			p: createVector(0,0),
			v: createVector(0,0),
			a: createVector(0,0),
			color: color(255),
			rSpan: random([10,20,50,100]),
			dashSpan: random([1,10,10000000]),
			r: 2
		}
		Object.assign(def,args)
		Object.assign(this,def)
	}
	update(){
		this.lastP.x = this.p.x
		this.lastP.y = this.p.y
		this.p.add(this.v)
		this.v.add(this.a)
		
			this.p.y+=sin(this.p.x/this.rSpan)*4
			this.p.x+=sin(this.p.y/this.rSpan)*4
		if (int(this.p.x)%20==0){
			this.v.x+=(noise(this.p.x*100,100000)-0.5)/10
			this.v.y+=(noise(this.p.y*100,5)-0.5)/10
			// this.p.y+=sin(this.p.x/5)*2
			// this.p.x+=sin(this.p.y/5)*2
			// this.v.x+=random(-1,1)
			// this.v.y+=random(-1,1)
			if (random()<0.3){
				this.color = random(random([colors,colors2]))
			}
		}
		let delta = createVector(width/2,height/2).sub(this.p)
		this.p.add(delta.mult(0.1).limit(4))
		this.v.mult(0.999)
		this.r*=0.998
	}
	draw(){
		push()
			noStroke()
			strokeWeight(this.r)
			stroke(this.color)
			// translate(this.p.x,this.p.y)
			// ellipse(0,0,this.r)
			if ((frameCount % this.dashSpan)<this.dashSpan*0.7){
				line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			}
			if (random()<0.1){
				noStroke()
				fill(0,100)
				for(var i=0;i<5;i++){
					ellipse(this.p.x+random(-20,20),this.p.y+random(-20,20),random(2))
				}
			}
			let c = color(this.color)
			c.setAlpha(3)
			stroke(c)
			blendMode(SCREEN)
			// for(var i=4;i<5;i++){
			// 	strokeWeight(i*3)
			// 	line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			// }
			// strokeWeight(6)
			// line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			// strokeWeight(8)
			// line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			
			// ellipse(0,0,this.r*2)
			// ellipse(0,0,this.r*3)
			// ellipse(0,0,this.r*4)
		pop()
		
	}
}