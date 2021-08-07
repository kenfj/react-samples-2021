import React, { useEffect, useState } from 'react'
import HexCalc from './HexCalc'
import HexDraw from './HexDraw'
import { Hex, Point } from './Types'
import useCanvas from './useCanvas'

type Props = {
    width: number
    height: number
    hexSize: number
    hexOrigin: Point
    className: string
    hexes: Hex[]
    comeFrom: { [key: string]: Hex; }
    setComeFrom: React.Dispatch<React.SetStateAction<{[key: string]: Hex;}>>
}

function CanvasInteraction(props: Props) {
    const canvasRef = useCanvas(null)

    const [rect, setRect] = useState<DOMRect>()
    const [goalHex, setGoalHex] = useState<Hex>({ q: 0, r: 0, s: 0 })

    const hexes = props.hexes
    const comeFrom = props.comeFrom
    const setComeFrom = props.setComeFrom

    const hexCalc = HexCalc(props.hexSize, props.hexOrigin)
    const pixelToHex = hexCalc.pixelToHex
    const getNeighbors = hexCalc.getNeighbors
    const cubeRound = hexCalc.cubeRound

    const [drawHex] = HexDraw(props.hexSize, props.hexOrigin)

    useEffect(() => {
        const canvas = canvasRef.current!
        setRect(canvas.getBoundingClientRect())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseMove = (e: React.MouseEvent) => {
        const offsetX = e.pageX - rect?.left!
        const offsetY = e.pageY - rect?.top!

        const currentHex = cubeRound(pixelToHex({ x: offsetX, y: offsetY }))

        if (JSON.stringify(currentHex) !== JSON.stringify(goalHex)) {
            const canvas = canvasRef.current!
            const ctx = canvas.getContext("2d")!
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const path = getPath(currentHex, goalHex, comeFrom)
            drawPath(canvasRef.current!, path)
        }
    }

    function getPath(current: Hex, goal: Hex, cameFrom: { [key: string]: Hex; }): Hex[] {
        let currentS = JSON.stringify(current)
        let goalS = JSON.stringify(goal)

        if (!(currentS in cameFrom)) {
            return []
        }

        let path: Hex[] = [current]

        while (currentS !== goalS) {
            current = cameFrom[currentS]
            path.push(current)
            currentS = JSON.stringify(current)
        }

        return path
    }

    function drawPath(canvas: HTMLCanvasElement, path: Hex[]) {
        path.forEach((hex, i) => {
            drawHex(canvas, hex, 1, "black", i === path.length - 1 ? "red" : "#05b9f5")
        })
    }

    const handleClick = (e: React.MouseEvent) => {
        const offsetX = e.pageX - rect?.left!
        const offsetY = e.pageY - rect?.top!

        const theHex = cubeRound(pixelToHex({ x: offsetX, y: offsetY }))

        if (hexes.some(hex => JSON.stringify(hex) === JSON.stringify(theHex))) {
            setGoalHex(theHex)
            const comeFrom = breadthFirstSearch(theHex)
            setComeFrom(comeFrom)
        }
    }

    function breadthFirstSearch(playerPosition: Hex) {
        let frontier = [playerPosition]
        let cameFrom: { [key: string]: Hex; } = {}
        cameFrom[JSON.stringify(playerPosition)] = playerPosition

        while (frontier.length !== 0) {
            const curr = frontier.shift()!
            const neighbors = getNeighbors(curr!)

            neighbors.forEach((neighbor) => {
                const neighborS = JSON.stringify(neighbor)

                if (!(neighborS in cameFrom) &&
                    hexes.some(e => JSON.stringify(e) === JSON.stringify(neighbor))) {
                    frontier.push(neighbor)
                    cameFrom[neighborS] = curr
                }
            })
        }

        return cameFrom
    }

    return (
        <canvas ref={canvasRef} className={props.className}
            onMouseMove={handleMouseMove}
            onClick={handleClick} />
    )
}

export default CanvasInteraction
