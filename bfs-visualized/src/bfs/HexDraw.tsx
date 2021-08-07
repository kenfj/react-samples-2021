import HexCalc from "./HexCalc"
import { Hex, Point } from "./Types"

function HexDraw(hexSize: number, hexOrigin: Point) {

    const hexCalc = HexCalc(hexSize, hexOrigin)
    const hexToPixel = hexCalc.hexToPixel
    const getHexCornerCoordinate = hexCalc.getHexCornerCoordinate

    function drawHex(canvas: HTMLCanvasElement, hex: Hex, lineWidth: number, lineColor: string, fillColor: string) {
        const point = hexToPixel(hex)

        for (let i = 0; i < 6; i++) {
            let start = getHexCornerCoordinate(point, i)
            let end = getHexCornerCoordinate(point, i + 1)
            drawLine(canvas, start, end, lineColor, lineWidth)
            fillHex(canvas, point, fillColor)
        }
    }

    function drawLine(canvas: HTMLCanvasElement, start: Point, end: Point, lineColor: string, lineWidth: number) {
        const ctx = canvas.getContext("2d")!
        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth

        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        ctx.closePath()
    }

    function fillHex(canvas: HTMLCanvasElement, center: Point, fillColor: string) {
        const c0 = getHexCornerCoordinate(center, 0)
        const c1 = getHexCornerCoordinate(center, 1)
        const c2 = getHexCornerCoordinate(center, 2)
        const c3 = getHexCornerCoordinate(center, 3)
        const c4 = getHexCornerCoordinate(center, 4)
        const c5 = getHexCornerCoordinate(center, 5)

        const ctx = canvas.getContext("2d")!
        ctx.fillStyle = fillColor
        ctx.globalAlpha = 0.1

        ctx.beginPath()
        ctx.moveTo(c0.x, c0.y)
        ctx.lineTo(c1.x, c1.y)
        ctx.lineTo(c2.x, c2.y)
        ctx.lineTo(c3.x, c3.y)
        ctx.lineTo(c4.x, c4.y)
        ctx.lineTo(c5.x, c5.y)
        ctx.closePath()
        ctx.fill()
    }

    return (
        [drawHex]
    )
}

export default HexDraw
