// Star objects;
var Sun;
// Planet objects;
var Earth;
// Moon objects;
var Moon;


// Initializing variables
var timePast = 1
var backgroundStarsArray = []

// Loading the JSON file with all the celestial bodies
var celestialBodies
function preload() {
  celestialBodies = loadJSON("celestialBodies.json")
}


function setup() {
// Calling all the celestrial bodies objects
  Sun   = new celestialBody(100, color(200, 200,  40),   "star",      "",   "Sun",    0)
  Earth = new celestialBody( 25, color(  0,  50, 200), "planet",   "Sun", "Earth",  365)
  Moon  = new celestialBody( 10, color(200, 200, 200),   "moon", "Earth",  "Moon",   28)
  //         celestialBody(size, color,                    type,  parent,    name, year)
  // Sun   = new celestialBody( 30, color(200, 200,  40),   "star",      "",   "Sun",    0)
  // Mercu = new celestialBody(  5, color(150, 150, 150), "planet",   "Sun", "Mercu",   88, 0)
  // Venus = new celestialBody( 12, color(200,  50,   0), "planet",   "Sun", "Venus",  225, 1)
  // Earth = new celestialBody( 15, color(  0,  50, 200), "planet",   "Sun", "Earth",  365, 2)
  // Mars  = new celestialBody(  6, color(250,  50,  50), "planet",   "Sun",  "Mars",  687, 3)
  // Jupit = new celestialBody( 75, color(125,  75,  75), "planet",   "Sun", "Jupit", 4380, 4)
  // Satrn = new celestialBody( 50, color(100, 125, 100), "planet",   "Sun", "Satrn",10585, 5)
  // Urans = new celestialBody( 25, color( 50,  50, 255), "planet",   "Sun", "Urans",30660, 6)
  // Neptn = new celestialBody( 24, color(  0,   0, 200), "planet",   "Sun", "Neptn",60225, 7)




  console.log(JSON.stringify(celestialBodies, null, '   '))

// Creating the canvas and its background
  createCanvas(800, 800)
  background(0)
  backgroundStars(true)
}

function draw() {
  background(0)
  backgroundStars()
  translate(width/2, height/2) // This sets our origin (0, 0) in the center of the canvas rather than on the corner

  // Here we call the functions that will actually draw the bodies.
  // Note that, as the Sun will occupy the center, no translation will be needed.
  Sun.draw()
  Earth.traslation()
  Moon.traslation()
  // Mercu.traslation()
  // Venus.traslation()
  // Earth.traslation()
  // Mars.traslation()
  // Jupit.traslation()
  // Satrn.traslation()
  // Urans.traslation()
  // Neptn.traslation()




  // This variable sets the amount of time it passes per frame.
  // 0 would mean no time passes, 0.5 would mean 1 frame = 0.5 days, 1 would mean 1 frame = 1 day...
  timePast+=0.25
}


// This function creates the background stars at the beggining AND draws them in the same place every frame
function backgroundStars(bool) {
  push() // This push() then pop() will prevent the styles from applying to other objects
  stroke(255, 255, 255)
  // This will be executed the first time:
  if (bool) {
    // We create 50 random points. We do this before setting the center of our canvas as (0, 0)
    for (i=0; i<50; i++) {
      var x = random(0, width)
      var y = random(0, height)
      point(x, y)
      // In order to create them in the same place in the future, we create an array:
      var pos = createVector(x, y)
      backgroundStarsArray.push(pos)
    }
  }
  // Every frame, this next loop will create all the stars in the array
  else {
    for (i=0; i<backgroundStarsArray.length; i++){
      point(backgroundStarsArray[i]["x"], backgroundStarsArray[i]["y"])
    }
  }
  pop()
}
