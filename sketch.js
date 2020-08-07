let cellSize = 10;
let cells = [];
let mX = 10;
let mY = 10;
let mWidth;
let mHeight;
let dir = {
  N: {
    id: 0,
    x: 0,
    y: -1
  },
  E: {
    id: 1,
    x: 1,
    y: 0
  },
  S: {
    id: 2,
    x: 0,
    y: 1
  },
  W: {
    id: 3,
    x: -1,
    y: 0
  }
}

function setup() {
  createCanvas(400, 400);
  mWidth = width / cellSize;
  mHeight = height / cellSize;
  background(220);
  frameRate(1);
  cells.push(new Cell(mX, mY));
  showAll();
}

function draw() {
  let pmX = mX;
  let pmY = mY;
  direction = cells[cells.length - 1].directions.shift();
  mX += direction.x;
  mY += direction.y;
  cells.push(new Cell(mX, mY));
  cells[cells.length - 1].walls[(direction.id + 6) % 4] = false;
  cells[cells.length - 1].pruneDirections();
  previousCell = findCell(pmX,pmY);
  cells[previousCell].walls[(direction.id)] = false;
  showAll();
}

function showAll() {
  background(220);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
    textAlign(LEFT,TOP)
    textSize(5)
    text(str(i), cells[i].x * cellSize +1, cells[i].y * cellSize+1)
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

function outOfBounds(x, y) { //return if a given maze x or y is out of bounds
  return (x < 0 || y < 0 || x > mWidth || y > mHeight);
}

class Cell {
  constructor(x_, y_, walls_ = [true, true, true, true]) {
    this.x = x_;
    this.y = y_;
    this.walls = walls_;
    this.directions = shuffle([dir.N, dir.E, dir.S, dir.W]);
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
  pruneDirections() { //remove any directions that a cell cannot go
    for (let i = this.directions.length - 1; i >= 0; i--) {
      console.log(this.directions[i], i);
      let checkX = this.x + this.directions[i].x;
      let checkY = this.y + this.directions[i].y;
      console.log(checkX, checkY, findCell(checkX, checkY));
      if (findCell(checkX, checkY) != null || outOfBounds(checkX, checkY)) {
        this.directions.splice(i, 1);
      }
    }
  }
}
