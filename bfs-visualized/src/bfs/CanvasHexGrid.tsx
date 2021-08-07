import React, { useEffect } from 'react'
import HexCalc from './HexCalc'
import HexDraw from './HexDraw'
import { Hex, Point } from './Types'
import useCanvas from './useCanvas'

const obstacles: Hex[] = [
    { q: 4, r: -2, s: -2 },
    { q: 4, r: -1, s: -3 },
    { q: 4, r: 0, s: -4 },
    { q: 4, r: 1, s: -5 },
]

type Props = {
    width: number
    height: number
    hexSize: number
    hexOrigin: Point
    className: string
    setHexes: React.Dispatch<React.SetStateAction<Hex[]>>
}

function CanvasHexGrid(props: Props) {
    const canvasRef = useCanvas(null)

    const hexSize = props.hexSize
    const hexWidth = hexSize * Math.sqrt(3)
    const hexOrigin = props.hexOrigin
    const setHexes = props.setHexes

    const hexCalc = HexCalc(hexSize, hexOrigin)
    const [drawHex] = HexDraw(hexSize, hexOrigin)
    const hexToPixel = hexCalc.hexToPixel

    useEffect(() => {
        drawHexes(canvasRef.current!)
        drawObstacles(canvasRef.current!)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function drawHexes(canvas: HTMLCanvasElement) {
        const canvasWidth = props.width
        const canvasHeight = props.height

        const qLeftSide = Math.round(hexOrigin.x / hexWidth)
        const qRightSide = Math.round((canvasWidth - hexOrigin.x) / hexWidth)
        const rTopSide = Math.round(hexOrigin.y / hexSize)
        const rBottomSide = Math.round((canvasHeight - hexOrigin.y) / hexSize)

        let reachableHexes: Hex[] = []
        let p = 0

        for (let r = 0; r <= rBottomSide; r++) {
            if (r % 2 === 0 && r !== 0) {
                p++
            }
            for (let q = -qLeftSide; q < qRightSide; q++) {
                const bottomH = { q: q - p, r, s: -(q - p) - r }

                const { x, y } = hexToPixel(bottomH)

                if (!(hexWidth < x && x < canvasWidth - hexWidth &&
                    hexSize < y && y < canvasHeight - hexSize)) {
                    continue
                }

                drawHex(canvas, bottomH, 1, "black", "pink")
                drawHexCoordinates(canvas, { x, y }, bottomH)

                if (!obstacles.some(e => JSON.stringify(e) === JSON.stringify(bottomH))) {
                    reachableHexes.push(bottomH)
                }
            }
        }

        let n = 0

        for (let r = -1; r >= -rTopSide; r--) {
            if (r % 2 !== 0) {
                n++
            }
            for (let q = -qLeftSide; q < qRightSide; q++) {
                const topH = { q: q + n, r, s: -(q + n) - r }

                const { x, y } = hexToPixel(topH)

                if (!(hexWidth < x && x < canvasWidth - hexWidth &&
                    hexSize < y && y < canvasHeight - hexSize)) {
                    continue
                }

                drawHex(canvas, topH, 1, "black", "beige")
                drawHexCoordinates(canvas, { x, y }, topH)

                if (!obstacles.some(e => JSON.stringify(e) === JSON.stringify(topH))) {
                    reachableHexes.push(topH)
                }
            }
        }

        setHexes(reachableHexes)
    }

    function drawObstacles(canvas: HTMLCanvasElement) {
        obstacles.forEach((obstacle, i) => {
            drawHex(canvas, obstacle, 1, "black", "black")
        })
    }

    function drawHexCoordinates(canvas: HTMLCanvasElement, center: Point, h: Hex) {
        const ctx = canvas.getContext("2d")

        ctx!.fillStyle = "black"
        ctx!.globalAlpha = 0.3
        ctx!.font = "8px sans-serif"

        ctx?.fillText(`q${h.q}`, center.x + 1, center.y)
        ctx?.fillText(`r${h.r}`, center.x - 3, center.y + 13)
        ctx?.fillText(`s${h.s}`, center.x - 15, center.y)
    }

    return (
        <canvas ref={canvasRef} className={props.className} />
    )
}

export default CanvasHexGrid
