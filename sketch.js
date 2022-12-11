//Anjali Shiyamsaran
//Music Visualizer Final Project
//Sound file: https://soundcloud.com/heda-official/stray-kids-back-door-heda-remix

var a = 0;
let sound;
let fft;
var cs;

var colorSlider = 100;

//preload sound files
function preload() {
  sound = loadSound('Stray_Kids.mp3');
}

//set up canvas, frame rate, and create new p5.fft object
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(0);
  frameRate(30);
  
  colorSlider = createSlider(0, 255, 0, 5);
  colorSlider.position(windowWidth/2.5, 20);
  fill(255, 255, 255);
  text('lightness', colorSlider.x * 2 + colorSlider.width, 35);
  
  fft = new p5.FFT();
  fft.setInput(sound);
  sound.loop();
}

//draw music visualizer using quads with random color fills
function draw() {
  var cs = colorSlider.value();
  
  a -= 0.1;
  background(0); 
	
  for (var xVal = -10; xVal < 10; xVal++) {
  for (var zVal = -10; zVal < 10; zVal++) {
		 
  var yVal = int(40 * cos(0.55 * analysis(xVal, zVal, 0, 0) + a));
    
  var xmVal = xVal*17 -8;
  var xtVal = xVal*17 +8;
  var zmVal = zVal*17 -8;
  var ztVal = zVal*17 +8;
    
  var halfWidth = width/2;
  var halfHeight = height/2;
				
  var isox1 = int(xmVal - zmVal + halfWidth);
  var isoy1 = int((xmVal + zmVal) * 0.5 + halfHeight);
  var isox2 = int(xmVal - ztVal + halfWidth);
  var isoy2 = int((xmVal + ztVal) * 0.5 + halfHeight);
  var isox3 = int(xtVal - ztVal + halfWidth);
  var isoy3 = int((xtVal + ztVal) * 0.5 + halfHeight);
  var isox4 = int(xtVal - zmVal + halfWidth);
  var isoy4 = int((xtVal + zmVal) * 0.5 + halfHeight);
    
  fill (random(cs), random(cs), random(cs));
  quad(isox2, isoy2-yVal, isox3, isoy3-yVal, isox3, isoy3+40, isox2, isoy2+40);
  fill(random(cs), random(cs), random(cs));
  quad(isox3, isoy3-yVal, isox4, isoy4-yVal, isox4, isoy4+40, isox3, isoy3+40);
  fill(167, 199, 231);
  quad(isox1, isoy1-yVal, isox2, isoy2-yVal, isox3, isoy3-yVal, isox4, isoy4-yVal);
  	}
  }
}

//analyze sound using for loop
function analysis(x, y, cx, cy) {
  let spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i++) {
    return sqrt(sq(cx - x) + sq(cy - y))+spectrum[i]*0.01;
  }
}