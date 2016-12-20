// All the arguments here correspond to the arguments we needed to set earlier
function celestialBody(size, color, type, parent, name, year, index) {
  // pos = (x, y)
  // This is the initial position vector. It will then be automatically changed, but it needs to be initialized
  this.pos = createVector(0, 0)
  // Type is either "star", "planet" or "moon"
  this.type = type

  // Depending on the type, we'll need to insert the properties in one or another part of the JSON file
  if (this.type == "star") {
    celestialBodies.Stars[name] = {Planets:[]}
    // Path is the object itself referenced in the JSON
    this.path = celestialBodies.Stars[name]

  } else if (this.type == "planet") {
    celestialBodies.Planets[name] = {Star:"", Moons:[]}
    celestialBodies.Planets[name]["Star"] = parent
    // Parent is the body it revolves around. In the case of Earth is the Sun.
    this.parent = celestialBodies.Stars[parent]
    this.path = celestialBodies.Planets[name]

  } else if (this.type == "moon") {
    celestialBodies.Moons[name] = {Planet:""}
    celestialBodies.Moons[name]["Planet"] = parent
    this.parent = celestialBodies.Planets[parent]
    this.path = celestialBodies.Moons[name]
  }
  // We'll include the current position of the object in the JSON for easier referencing
  this.path["Pos"] = [this.pos.x, this.pos.y]

  // This will calculate the place of the orbit the object needs to be drawn at.
  this.traslation = function() {
    push()
    i = map(timePast, 1, year, 0, 6.28) // 1 year = 1 full translation around the parent

    translate(this.parent["Pos"][0], this.parent["Pos"][1]) // The parent needs to be the center of the orbit
    if (index){var orbitRadius = index * 50 + 50} else {var orbitRadius = size * 8}
    // 8 above is an arbitrary number, but if it isn't the same in both lines below, the result will be an elliptical orbit, rather than a circular one
    this.path["Pos"][0] = (orbitRadius) * cos(i) // With trigonometry, we can compute the place of the orbit.
    this.path["Pos"][1] = (orbitRadius) * sin(i)
    this.draw() // Once we know where to draw it, we can call the next function
    pop()
  }

  // This renders a circle at the given position, size and color
  this.draw = function() {
    push()
    fill(color)
    ellipse(this.path["Pos"][0], this.path["Pos"][1], size, size)
    pop()
  }
}
