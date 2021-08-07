
class Node {
  i: number;
  j: number;
  isWall: boolean = false;
  private _isStart: boolean = false;
  private _isEnd: boolean = false;
  neighbors: Node[] = [];
  g: number = 0;  // current shortest distance from the start
  h: number = 0;  // estimated distance to the end
  private _f: number = 0;   // = g + h
  previous?: Node = undefined;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;

    if (Math.random() < 0.2) {
      this.isWall = true
    }
  }

  get f(): number {
    return this.g + this.h;
  }

  get isStart(): boolean {
    return this._isStart;
  }

  set isStart(value: boolean) {
    this._isStart = value
    if (value)
      this.isWall = false
  }

  get isEnd(): boolean {
    return this._isEnd;
  }

  set isEnd(value: boolean) {
    this._isEnd = value
    if (value)
      this.isWall = false
  }
}

export default Node
