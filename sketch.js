let cellSize = 10;
let cells = [];
let mX = 10;
let mY = 10;

function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(1)
}

function draw() {
  cells.push(new Cell(mX * cellSize, mY * cellSize, shuffle([0, 1, 2, 3])));
  direction = cells[cells.length - 1].dirOrder.shift();

  showAll();
  mX += cardinalTranslate(direction)[0];
  mY += cardinalTranslate(direction)[1];
}

function showAll() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
  }
}

function cardinalTranslate(direction) {
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
    default:
      return [0, 0];
      break;
  }
}

class Cell {
  constructor(x_, y_, dirOrder_ = [0, 1, 2, 3], walls_ = [false, false, true, true]) {
    this.x = x_;
    this.y = y_;
    this.walls = walls_;
    this.dirOrder = dirOrder_;
    this.firstDraw = true;
  }
  show() { //draw the cell
    noStroke();
    if (this.firstDraw) {
      fill(128, 128, 255);
      this.firstDraw = false;
    } else {
      fill(255);
    }
    rect(this.x, this.y, cellSize, cellSize);
    stroke(0);
    strokeWeight(1);
    strokeCap(PROJECT);
    if (this.walls[0]) {
      line(this.x, this.y, this.x + cellSize, this.y);
    }
    if (this.walls[1]) {
      line(this.x + cellSize, this.y, this.x + cellSize, this.y + cellSize);
    }
    if (this.walls[2]) {
      line(this.x, this.y + cellSize, this.x + cellSize, this.y + cellSize);
    }
    if (this.walls[3]) {
      line(this.x, this.y, this.x, this.y + cellSize);
    }
  }
}
