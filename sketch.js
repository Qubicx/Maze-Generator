let cellSize = 10;

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  let cells = []
  for (let i = 0; i < width / cellSize; i++) {
    for (let j = 0; j < height / cellSize; j++) {
      cells.push(new Cell(i * cellSize,j * cellSize, [random([true,false]),random([true,false]),random([true,false]),random([true,false])]));
      cells[cells.length-1].show();
    }
  }
  noLoop();
}

class Cell {
  constructor(x_, y_, walls_ = [true, true, true, true]) {
    this.x = x_;
    this.y = y_;
    this.walls = walls_;
  }
  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, cellSize, cellSize);
    stroke(0);
    strokeWeight(1);
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
