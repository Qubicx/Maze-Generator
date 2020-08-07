let cellSize = 10;
let cells = [];
let mX = 10;
let mY = 10;
let mWidth;
let mHeight;

function setup() {
  createCanvas(400, 400);
  mWidth = width / cellSize;
  mHeight = height / cellSize;
  background(220);
  frameRate(1);
}

function draw() {
  cells.push(new Cell(mX, mY));
  cells[cells.length - 1].pruneDirections();
  direction = cells[cells.length - 1].directions.shift();
  showAll();
  mX += getOffset(direction)[0];
  mY += getOffset(direction)[1];
}

function showAll() {
  background(220);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
}

function findCell(x, y) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].x == x && cells[i].y == y) {
      return i;
    }
  }
  return null;
}

function getOffset(direction) { //get x & y offsets for a given direction
  switch (direction) {
    case 0: //north
      return [0, -1];
      break;
    case 1: //east
      return [1, 0];
      break;
    case 2: //south
      return [0, 1];
      break;
    case 3: //west
      return [-1, 0];
      break;
  }
}

function outOfBounds(x,y) { //return if a given maze x or y is out of bounds
  return (x < 0 || y < 0 || x > mWidth || y > mHeight);
}

class Cell {
  constructor(x_, y_,  walls_ = [true, true, true, true]) {
    this.x = x_;
    this.y = y_;
    this.walls = walls_;
    this.directions = shuffle([0, 1, 2, 3]);
    this.firstDraw = true;
  }
  show() { //draw the cell
    this.cX = this.x * cellSize;
    this.cY = this.y * cellSize;
    noStroke();
    if (this.firstDraw) {
      fill(128, 128, 255);
      this.firstDraw = false;
    } else {
      fill(255);
    }
    rect(this.cX, this.cY, cellSize, cellSize);
    stroke(0);
    strokeWeight(1);
    strokeCap(PROJECT);
    if (this.walls[0]) {
      line(this.cX, this.cY, this.cX + cellSize, this.cY);
    }
    if (this.walls[1]) {
      line(this.cX + cellSize, this.cY, this.cX + cellSize, this.cY + cellSize);
    }
    if (this.walls[2]) {
      line(this.cX, this.cY + cellSize, this.cX + cellSize, this.cY + cellSize);
    }
    if (this.walls[3]) {
      line(this.cX, this.cY, this.cX, this.cY + cellSize);
    }
  }
  pruneDirections() {
    for (let i = this.directions.length - 1 ; i >= 0; i--) {
      console.log(this.directions[i], i);
      let checkX = this.x + getOffset(this.directions[i])[0];
      let checkY = this.y + getOffset(this.directions[i])[1];
      console.log(checkX,checkY,findCell(checkX,checkY));
      if (findCell(checkX,checkY) != null || outOfBounds(checkX,checkY)) {
        this.directions.splice(i,1);
      }
    }
  }
}
