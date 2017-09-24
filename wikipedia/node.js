// Node Object
// an Individual Article

function Node(x, y, s, parent) {
  this.x = x;
  this.y = y;
  this.r = 48;
  this.name = s;

  // Keeping track of every other node
  this.parent = parent;
  this.children = [];
  this.reveal = false;
}

// This Function Draws the Article as a circle
Node.prototype.draw = function() {
  // If it's Revealed
  if (this.reveal) {
    push();

    // Line
    if (this.parent) {
      stroke(127, 63, 0);
      if (this.hovered()) {
        stroke(63, 127, 0);
      }
      line(this.parent.x, this.parent.y, this.x, this.y);
    }

    // Circle
    fill(255, 127, 0);
    if (this.hovered()) {
      fill(127, 255, 0);
    }
    ellipseMode(RADIUS);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);

    // Name
    textAlign(CENTER, CENTER);
    fill(127, 63, 0);
    if (this.hovered()) {
      fill(63, 127, 0);
    }
    text(this.name, this.x, this.y);

    // for (let i = 0; i < this.children.length; i++) {
    //   this.children[i].draw();
    // }

    pop();
  }
};

// This Function Checks if the Node is Hovered Over or not
Node.prototype.hovered = function() {
  var d = dist(this.x, this.y, mouseX, mouseY);
  if (d < this.r) {
    cursor(HAND);
    return true;
  }
  cursor(ARROW);
  return false;
};

// This Function Makes another Child
Node.prototype.addChild = function(child) {
  this.children.push(child);
};

// This Function Checks if the Node Contains the Specified Child
Node.prototype.contains = function(child) {
  for (let i = 0; i < this.children.length; i++) {
    var n = this.children[i];
    if (child.x == n.x && child.y == n.y && child.name == n.name) {
      return true;
    }
  }
  return false;
}
