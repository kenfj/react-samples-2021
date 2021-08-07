import Node from '../components/Node'

export type AStarRes = {
  shortestPath: Node[],
  visited: Node[],
}

// c.f. good and simple explanation of AStar algorithm
// A* Pathfinding Visualization Tutorial
// https://www.youtube.com/watch?v=JtiK0DOeI4A
function AStar(startNode: Node, endNode: Node): AStarRes {
  let openSet: Node[] = []  // queue of nodes to check next
  let visited: Node[] = []

  openSet.push(startNode)

  while (openSet.length > 0) {
    // pop the node of min f from openSet (same as priority queue)
    let current = openSet.reduce((prev, curr) => curr.f < prev.f ? curr : prev)
    openSet = openSet.filter(x => x !== current)

    visited.push(current)

    if (current === endNode) {
      var shortestPath = backtrackToStart(current)
      return { shortestPath, visited }
    }

    for (const neighbor of current.neighbors) {
      if (visited.includes(neighbor) || neighbor.isWall)
        continue

      if (!openSet.includes(neighbor)) {
        neighbor.g = current.g + 1
        neighbor.h = heuristic(neighbor, endNode)
        neighbor.previous = current
        openSet.push(neighbor)
      }
    }
  }

  return { shortestPath: [], visited }
}

function backtrackToStart(node: Node) {
  let path: Node[] = [node]

  while (node.previous) {
    path.push(node.previous)
    node = node.previous
  }

  return path
}

function heuristic(a: Node, b: Node) {
  let d = Math.abs(a.i - a.j) + Math.abs(b.i - b.j)
  return d
}

export default AStar
