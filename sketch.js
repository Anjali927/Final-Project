//Anjali Shiyamsaran
//Music Visualizer Final Project
//Sound file: https://soundcloud.com/heda-official/stray-kids-back-door-heda-remix

var a = 0;
let sound;
let fft;
var r;
var g;

var rslider = 100;
var gslider = 100;

//preload sound files
function preload() {
  sound = loadSound('Stray_Kids.mp3');
}

//set up canvas, frame rate, and create new p5.fft object
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(0);
  frameRate(30);
  
  rslider = createSlider(0, 255, 0, 5);
  gslider = createSlider(0, 255, 0, 5);

  fft = new p5.FFT();
  fft.setInput(sound);
  sound.loop();
}

//draw music visualizer using quads with random color fills
function draw() {
  var r = rslider.value();
  var g = gslider.value();
  
  a -= 0.1;
  background(0); 
	
  for (var xVal = -10; xVal < 10; xVal++) {
  for (var zVal = -10; zVal < 10; zVal++) {
		 
  var yVal = int(40 * cos(0.55 * analysis(xVal, zVal, 0, 0) + a));  
    
  var xmVal = xVal*17 -8.5;
  var xtVal = xVal*17 +8.5;
  var zmVal = zVal*17 -8.5;
  var ztVal = zVal*17 +8.5;
    
  var halfw = width/2;
  var halfh = height/2;
				
  var isox1 = int(xmVal - zmVal + halfw);
  var isoy1 = int((xmVal + zmVal) * 0.5 + halfh);
  var isox2 = int(xmVal - ztVal + halfw);
  var isoy2 = int((xmVal + ztVal) * 0.5 + halfh);
  var isox3 = int(xtVal - ztVal + halfw);
  var isoy3 = int((xtVal + ztVal) * 0.5 + halfh);
  var isox4 = int(xtVal - zmVal + halfw);
  var isoy4 = int((xtVal + zmVal) * 0.5 + halfh);
    
  fill (random(r, g), random(r, g), random(r, g));
  quad(isox2, isoy2-yVal, isox3, isoy3-yVal, isox3, isoy3+40, isox2, isoy2+40);
  fill(random(r, g), random(r, g), random(r, g));
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