import { Hex, Point } from './Types'

// c.f. https://www.redblobgames.com/grids/hexagons/
function HexCalc(hexSize: number, hexOrigin: Point) {

   function hexToPixel(hex: Hex): Point {
      const x = hexSize * Math.sqrt(3) * (hex.q + hex.r / 2) + hexOrigin.x
      const y = hexSize * 3. / 2 * hex.r + hexOrigin.y
      return { x, y }
   }

   function pixelToHex(p: Point): Hex {
      const q = ((p.x - hexOrigin.x) * Math.sqrt(3) / 3 - (p.y - hexOrigin.y) / 3) / hexSize
      const r = (p.y - hexOrigin.y) * 2 / 3 / hexSize

      return { q, r, s: -q - r }
   }

   function getHexCornerCoordinate(center: Point, i: number): Point {
      let angleDeg = 60 * i + 30
      let angleRad = Math.PI / 180 * angleDeg

      let x = center.x + hexSize * Math.cos(angleRad)
      let y = center.y + hexSize * Math.sin(angleRad)

      return { x, y }
   }

   function getNeighbors(h: Hex): Hex[] {
      const arr = []
      for (let i = 0; i < 6; i++) {
         const q = _getCubeNeighbor(h, i)
         arr.push(q)
      }
      return arr
   }

   function _getCubeNeighbor(h: Hex, direction: number) {
      return _cubeAdd(h, _cubeDirection(direction))
   }

   function _cubeAdd(a: Hex, b: Hex): Hex {
      return {
         q: a.q + b.q,
         r: a.r + b.r,
         s: a.s + b.s,
      }
   }

   function _cubeDirection(direction: number) {
      const cubeDirections: Hex[] = [
         { q: 1, r: 0, s: -1 },
         { q: 1, r: -1, s: 0 },
         { q: 0, r: -1, s: 1 },
         { q: -1, r: 0, s: 1 },
         { q: -1, r: 1, s: 0 },
         { q: 0, r: 1, s: -1 },
      ]
      return cubeDirections[direction]
   }

   function cubeRound(cube: Hex): Hex {
      let rx = Math.round(cube.q)
      let ry = Math.round(cube.r)
      let rz = Math.round(cube.s)

      const xDiff = Math.abs(rx - cube.q)
      const yDiff = Math.abs(ry - cube.r)
      const zDiff = Math.abs(rz - cube.s)

      if (xDiff > yDiff && xDiff > zDiff) {
         rx = -ry - rz
      } else if (yDiff > zDiff) {
         ry = -rx - rz
      } else {
         rz = -rx - ry
      }

      return { q: rx, r: ry, s: rz }
   }

   return {
      hexToPixel,
      pixelToHex,
      getHexCornerCoordinate,
      getNeighbors,
      cubeRound,
   }
}

export default HexCalc
