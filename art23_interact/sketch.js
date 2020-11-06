const particles = [],
			fonts = {};

let scale,
		theme,
		graphics,
		themeWidth;

function preload() {
	// fonts.bold = loadFont("BariolBold.ttf");
	// fonts.light = loadFont("BariolLight.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textAlign(RIGHT, BOTTOM)
	noStroke();
	fill(255);

	scale = random(8e2, 2e3);
	
	theme = random([
		{name: "Night Sky", colors: ["#45217C", "#0799F2", "#FFFFFF"], background: "#150832"},
		{name: "Fireball", colors: ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC30F"], background: "#1A0633"},
		{name: "Oceania", colors: ["#77C39C", "#2F5E36", "#55ABA5", "#2D7063", "#3F6829", "#44A872", "#215964", "#CDEDAE"], background: "#162A25"},
		{name: "Plankton", colors: ["#BCE784", "#5DD39E", "#348AA7", "#525174", "#513B56"], background: "#051A0A"},
		{name: "Fireflies", colors: ["#B7F0AD", "#D2FF96", "#EDDF7A", "#E8D33F", "#D17B0F"], background: "#141115"},
		{name: "Green Planet", colors: ["#91CB3E", "#4F772D", "#31572C", "#CEFF1A"], background: "#1A181B"},
		{name: "Red Planet", colors: ["#813405", "#D1462F", "#E4572E", "#EE964B"], background: "#2F100F"},
		{name: "Autumn", colors: ["#D62828", "#F77F00", "#FCBF49", "#EAE2B7"], background: "#003049"},
		{name: "Icefire", colors: ["#0067B2", "#066DE0", "#3AC5FF", "#81FFFA"], background: "#321016"},
		{name: "Parrot", colors: ["#1BE7FF", "#6EEB83", "#E4FF1A", "#E8AA14", "#FF5714"], background: "#161032"},
		{name: "Velvet", colors: ["#38040E", "#640D14", "#800E13", "#AD2831"], background: "#190225"},
		{name: "Dreamland", colors: ["#E8FFF1", "#BAFFE9", "#DF89F9", "#472CAA", "#47AA2C", "#2406FC"], background: "#172211"},
		{name: "Desertscape", colors: ["#3A4A4A", "#FEED5A", "#DA9D3B", "#7E4F3E", "#E3AF80"], background: "#322D12"},
		{name: "Magma", colors: ["#3A0300", "#5D0D02", "#EB4700", "#FF9F01", "#CD5201"], background: "#161032"},
		{name: "Magma", colors: ["#3A0300", "#5D0D02", "#EB4700", "#FF9F01", "#CD5201"], background: "#351812"},
		{name: "Amethyst", colors: ["#7B66DE", "#9381E4", "#AB9DEA", "#C3B9F0", "#DBD5F6"], background: "#2D1534"},
		{name: "OpenProcessing", colors: ["#73C1E8", "#73494A", "#F54949"], background: "#333333"},
		{name: "Steelheart", colors: ["#5C504A", "#4B3D3C", "#413535", "#30323D", "#3B3E4D"], background: "#161022"},
		{name: "Goldrush", colors: ["#151515", "#E6E9F1", "#EDB009", "#939496", "#717372"], background: "#150A28"},
		{name: "Lava", colors: ["#990000", "#D81515", "#EA2C2C", "#FFE500", "#FFED2D"], background: "#151218"},
		{name: "Dragonfly", colors: ["#01BAEF", "#79CC33", "#757575", "#FDFDFD"], background: "#002947"},
		{name: "Dragonfruit", colors: ["#B41059", "#EFF7F7", "#FEA4D0", "#91C66C", "#77B802"], background: "#0A0808"},
		{name: "Royalty", colors: ["#8E371C", "#E58434", "#DDAC39", "#8A036F", "#231616"], background: "#120612"},
		
		// Created by Lumgol
		{name: "Cotton Candy", colors: ["#9E9CF6", "#A6F7B7", "#F4B966", "#C9DEE5", "#CADA8A", "#E2C26E"], background: "#2D1273"},
		{name: "Android", colors: ["#5c5c5c", "#a8a8a8", "#e3e3e3", "#82d43b", "#b7ff87"], background: "#212121"},
		{name: "Wildwood",colors: ["#7a5d52", "#007525", "#2dc039", "#60573c", "#249fbd"], background: "#442710"}
	]);
	
	for (let i = 0; i < 200; i ++) particles.push(new Particle());
	
	graphics = createGraphics(width, height);
	graphics.background(theme.background);
	graphics.noStroke();
	
	textSize(120);
	themeWidth = textWidth(theme.name);
}

function draw() {
	for (const p of particles) p.update();
	for (const p of particles) p.draw();
	
	image(graphics, 0, 0);
	
	// textFont(fonts.bold);
	// textSize(120);
	// text(theme.name, width - 50, height - 20);
	
	// textFont(fonts.light);
	// textSize(60);
	// text("Your theme:", width - themeWidth + 180, height - 140);
}

class Particle {
	constructor(x, y) {
		this.pos = new p5.Vector(x || random(-50, width + 50), y || random(-50, height + 50));
		this.color = random(theme.colors);
		this.r = random(1, 3);
	}
	
	update() {
		const dir = noise(this.pos.x / scale, this.pos.y / scale) * TAU * scale;
		this.pos.add(Math.cos(dir) / 2, Math.sin(dir) / 2);
		
		if (this.pos.x < -50 || this.pos.x > width + 50 || this.pos.y < -50 || this.pos.y > height + 50)
			this.pos.set(random(-50, width + 50), random(-50, height + 50));
	}
	
	draw() {
		graphics.fill(this.color);
		graphics.circle(this.pos.x, this.pos.y, this.r);
	}
}

function mousePressed() {
	for (let i = 0; i < 5; i ++)
		particles.push(new Particle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
}

mouseDragged = mousePressed;