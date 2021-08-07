import React, { useEffect } from 'react'
import HexCalc from './HexCalc'
import { Hex, Point } from './Types'
import useCanvas from './useCanvas'

type Props = {
    hexSize: number
    hexOrigin: Point
    className: string
    comeFrom: { [key: string]: Hex; }
}

function CanvasArrows(props: Props) {
    const canvasRef = useCanvas(null)

    const hexCalc = HexCalc(props.hexSize, props.hexOrigin)
    const hexToPixel = hexCalc.hexToPixel

    useEffect(() => {
        drawArrows(canvasRef.current!, props.comeFrom)
    })

    function drawArrows(canvas: HTMLCanvasElement, comeFrom: { [key: string]: Hex; }) {
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (const fromHexS in comeFrom) {
            const fromPoint = hexToPixel(JSON.parse(fromHexS))
            const toPoint = hexToPixel(comeFrom[fromHexS])

            drawArrow(canvas, fromPoint, toPoint)
        }
    }

    function drawArrow(canvas: HTMLCanvasElement, from: Point, to: Point) {
        const ctx = canvas.getContext("2d")!
        const headLen = 5
        const angle = Math.atan2(to.y - from.y, to.x - from.x)

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = "#05b9f5"
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(to.x, to.y)
        ctx.globalAlpha = 0.5
        ctx.lineTo(to.x - headLen * Math.cos(angle - Math.PI / 7), to.y - headLen * Math.sin(angle - Math.PI / 7))
        ctx.lineTo(to.x - headLen * Math.cos(angle + Math.PI / 7), to.y - headLen * Math.sin(angle + Math.PI / 7))
        ctx.lineTo(to.x, to.y)
        ctx.lineTo(to.x - headLen * Math.cos(angle - Math.PI / 7), to.y - headLen * Math.sin(angle - Math.PI / 7))
        ctx.strokeStyle = "#05b9f5"
        ctx.lineWidth = 5
        ctx.stroke()
        ctx.fillStyle = "#05b9f5"
        ctx.fill()
    }

    return (
        <canvas ref={canvasRef} className={props.className} />
    )
}

export default CanvasArrows
