const branchs = {}
const WIDTH = 800;
const HEIGHT = 800;
const edgeCircleSize = 300
function setup() {
	pixelDensity(2)
	createCanvas(windowWidth, windowHeight);
	background(10, 10, 30);
	angleMode(DEGREES)
	createBranch(width/2, height - 100, -90, 60)
	drawBackground()
}

function draw() {
	Object.values(branchs).forEach((b) => {
		b.draw()
	})
	
	if (mouseIsPressed) {
		createBranch(mouseX + random(-20, 20), mouseY, random(-120, -70), random([25, 30, 50, 50]))
	}
}

function mapWidthToWeight(value) {
	return map(constrain(value, 0, 50), 0, 60, 1, 10)
}

function drawBackground () {
	noStroke()
	fill(0,0,0, 2)
	for (let i = 0; i< 5; i++) {
		ellipse(random(0, width), random(0, height), WIDTH * 0.8)
	}
}


function flowColor(x, y, alpha = 100) {
	const pick = random()
	let result
	if (pick > 0.8) {
		result = color(255, 181,181, alpha)
	} else if (pick > 0.5){
		result = color(255, 99,99, alpha)
	} else {
		result = color(255, 246,221, alpha)
	}

	return result
}
function mapToColor(width, weight) {
	const ratio = map(constrain(weight, 1, 10), 1, 10, 1, 0.2)
	return color(255, 255, 255, 50 * pow(ratio, 3))
}

function outOfEdge(x, y) {
	return dist(x, y, HEIGHT / 2, WIDTH / 2) > edgeCircleSize
}


let count = 0
function createBranch (x, y, angle, width, weight = 1) {
	const id = count++
	let px = x
	let py = y
	const step = 1
	let remain = width
	let initialWeight = mapWidthToWeight(width)
	
	const self = {
		id,
		deltaAngle(factor = 0) {
			return map(noise(px * 0.01, py * 0.01, frameCount / 100 + factor * 10), 0, 1, -120, 120)
		},
		draw() {
			if (remain < 0) {
				delete branchs[id]
				this.derive()
				return
			}

			
			const da = this.deltaAngle()
			const ax = cos(angle + da) 
			const ay = sin(angle + da)
			const nx = px + ax * step
			const ny = py + ay * step
			
			const nextWeight = initialWeight - (1 - remain/width)
			
				if (width < 5) {
					noStroke()
					const pushForward = random(0, 30)
					const dotX = x + ax * pushForward + random(-20, 20)
					const dotY = y + ay * pushForward + random(-20, 20)
					const dx = random(-3, 3)
					fill(flowColor(nx, ny, 5))
					ellipse(dotX, dotY, 60, 60)
					fill(flowColor(nx, ny, 160))
					ellipse(dotX, dotY, 2)
					ellipse(dotX + ax * 2, dotY + ay * 2, 5)
					ellipse(dotX + ax * 4, dotY + ay * 4, 6)
				} else {
					strokeWeight(nextWeight)
					stroke(mapToColor(width, nextWeight))
					line(px, py, nx, ny)
				}
			
			if (width < 2) {
				delete branchs[id]
			}
      
			remain = remain - dist(nx, ny, px, py)
			px = nx
			py = ny
		},
		
		derive() {
			if (width < 5) {
				return
			}
			let n
			if (width > 30) {
				n = random([1, 2, 2])
			} else if(width > 10) {
        n = random([1, 2, 3])
			} else {
				n = random([0, 1])
			}
			const nextWidth = width > 30 ? width * random(0.3,0.8) : width > 10 ? width * random([0.3, 0.7]) : width - 2
			for (let i = 0; i < n; i++) {
				const dtAng = this.deltaAngle(i)
				createBranch(px, py, angle + dtAng, nextWidth)
			}
		}
	}
	
	branchs[id] = self
  return self
}