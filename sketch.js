let cellSize = 20;
let cells = [];
let mX = 0;
let mY = 0;
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
  createCanvas(windowWidth - windowWidth % cellSize, windowHeight - windowHeight % cellSize);
  mWidth = width / cellSize;
  mHeight = height / cellSize;
  background(220);
  //frameRate(1);
  cells.push(new Cell(mX, mY));
  showAll();
}

function draw() {
  if (cells.length < mWidth * mHeight) {
    let backtrackIndex = null;
    while (backtrackIndex == null) {
      if (random() < 0.05) { // randomly start backtracking to create more random paths
        backtrackIndex = backtrack(floor(random(1, cells.length - 1)));
      } else {
        backtrackIndex = backtrack(cells.length - 1);
      }
    }
    direction = cells[backtrackIndex].directions.shift() //get cell's prefered direction
    mX = cells[backtrackIndex].x;
    mY = cells[backtrackIndex].y;
    let pmX = mX;
    let pmY = mY;
    mX += direction.x; //set mX & mY to the new cell location
    mY += direction.y;
    cells.push(new Cell(mX, mY)); //create the new cell
    cells[cells.length - 1].walls[(direction.id + 6) % 4] = false; //remove unwanted wall
    previousCell = findCell(pmX, pmY);
    cells[previousCell].walls[(direction.id)] = false; //remove unwanted wall on previous
  }
  //frameRate(map(mouseX,0,width,1,60));
  showAll();
}

function showAll() {
  background(220);
  for (let i = 0; i < cells.length; i++) {
    cells[i].show();
    // textAlign(LEFT, TOP)
    // textSize(4)
    // noStroke()
    // fill(0)
    // text(str(i), cells[i].x * cellSize + 1, cells[i].y * cellSize + 1)
  }
}

function backtrack(start) {
  let i = start;
  cells[i].pruneDirections(); //remove impossible movment locations
  while (cells[i].directions == 0) {
    i--;
    if (i == 0 && cells[i].directions != 0) {
      return null;
    }
    cells[i].pruneDirections();
  }
  return i;
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
  return (x < 0 || y < 0 || x > mWidth - 1 || y > mHeight - 1);
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
    strokeWeight(2);
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
      let checkX = this.x + this.directions[i].x;
      let checkY = this.y + this.directions[i].y;
      if (findCell(checkX, checkY) != null || outOfBounds(checkX, checkY)) {
        this.directions.splice(i, 1);
      }
    }
  }
}
