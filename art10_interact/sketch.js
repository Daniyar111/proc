let colors = "f2f230-c2f261-91f291-61f2c2-30f2f2-fff".split("-").map(a=>"#"+a)
let overAllTexture
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	// noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,40,80])))
		}
	}
	overAllTexture.updatePixels()
	midR= (width-50)/2.4
}
let rotateCount = 60
let midR 
function draw() {
	
	push()
	fill(0, 30, 55,30)
	rect(0,0,width,height)
	stroke(255)
	translate(width/2,height/2)
	// scale(1.1)
	stroke(255,30)
	strokeWeight(10)
	noFill()
	ellipse(0,0,midR*2)
	strokeWeight(2)
	ellipse(0,0,midR*2*0.9)
	rotate(noise(frameCount/150 )*2 + mouseX/50)
	for(var i=0;i<rotateCount;i+=1){
		push()
			drawingContext.shadowBlur =0;
			rotate(i*PI*2/rotateCount)
			stroke(255,30)
			strokeWeight(2)
			line(50,0,width/2-50,0)
		push()
			strokeWeight(( i%5==0?5:1))
			stroke(255)
			rotate(cos(-frameCount/80)*2)
			line(width/2-20,0,width/2 +( i%5==0?10:-5),0)
		pop()

			noStroke()
			let dotPos = sin(frameCount/100+i + noise(frameCount/500+i,i)/2)*(width/2-50 )*1.4
			let clr = colors[i%colors.length ]
			let sz = (cos(frameCount/20+i)+0.5+1)*22 
			let fillClr = color(clr)
			fillClr.setAlpha(200)
			strokeWeight(1)
			if ( random()<0.85 && (  !mouseIsPressed )&& (frameCount+i)%80>10 ){
				fill(fillClr)
			}
			stroke(clr)
			// drawingContext.shadowColor = clr
			// drawingContext.shadowBlur =10;
			ellipse(width/2*1.2,0,5,5)
			translate(dotPos/3,0)
			rotate(frameCount/100)
				rectMode(CENTER)
			if (i%2==0 && (random()<0.9)){
				ellipse(0,0,sz/2)			
			}else{
				rect(0,0,sz/2)			
			}
			translate(dotPos/3,0)
			rotate(-frameCount/100)
			if (i%2==0){
				ellipse(0,0,sz)			
			}else{
				rect(0,0,sz)			
			}
		
			// drawingContext.shadowBlur =0;
			
			
		pop()

	}
	pop()
	fill(255)
	textSize(20)
	colors.forEach((c,cId)=>{
		if (random()<0.9){
		fill(c)
		}else{
			noFill()
		}
		stroke(c)
		rect(30+cId*30,height-100,20)
	})
	text("Entity Count: "+rotateCount+
			 	"\n"+"System δ: "+frameCount/10,30,height-50)
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
}	