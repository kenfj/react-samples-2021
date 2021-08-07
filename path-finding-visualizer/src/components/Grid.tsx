import Node from './Node';

export type StartEndPos = {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

class Grid {
  grid: Node[][]
  private nRows: number
  private nCols: number
  startNode: Node
  endNode: Node

  constructor(nRows: number, nCols: number, pos: StartEndPos) {
    this.nRows = nRows
    this.nCols = nCols

    this.grid = new Array<Node[]>(nRows)
    for (let i = 0; i < nRows; i++) {
      this.grid[i] = new Array<Node>(nCols)
      for (let j = 0; j < nCols; j++) {
        this.grid[i][j] = new Node(i, j)
      }
    }

    this.startNode = this.grid[pos.startRow][pos.startCol]
    this.endNode = this.grid[pos.endRow][pos.endCol]

    this.startNode.isStart = true
    this.endNode.isEnd = true

    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols; j++) {
        let neighbors = this.findNeighbors(i, j)
        this.grid[i][j].neighbors = neighbors
      }
    }
  }

  findNeighbors(i: number, j: number): Node[] {
    let neighbors: Node[] = new Array<Node>()

    if (i > 0)
      neighbors.push(this.grid[i - 1][j])
    if (i < this.nRows - 1)
      neighbors.push(this.grid[i + 1][j])
    if (j > 0)
      neighbors.push(this.grid[i][j - 1])
    if (j < this.nCols - 1)
      neighbors.push(this.grid[i][j + 1])

    return neighbors
  }
}

export default Grid
