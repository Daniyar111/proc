var colors = "083d77-ebebd3-f4d35e-ee964b-f95738-f24".split("-").map(a=>"#"+a)
var colors2 = "22577a-38a3a5-57cc99-80ed99-c7f9cc-fff".split("-").map(a=>"#"+a)
var particles = []
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	fill("#151023")
	pixelDensity(2)
	rect(0,0,width,height)
	for(var i=0;i<height;i+=4){
		particles.push(new Particle({
			p: createVector(0,(i-height/2)+height/2),
			v: createVector(1,-(i-height/2)/50),
			a: createVector(0.03,0),
			color: colors[int(i/50)%colors.length],
			r: max(1,random(15)*random()*random())
		}))
	}
}

function draw() {
	noStroke()
	// background(0,1)
	particles.forEach(p=>{
		p.update()
		p.draw()
	})
	// ellipse(mouseX, mouseY, 20, 20);
}