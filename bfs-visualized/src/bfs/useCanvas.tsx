import { useEffect, useRef } from 'react'

function useCanvas(initialValue: HTMLCanvasElement | null) {
    const canvasRef = useRef<HTMLCanvasElement>(initialValue)

    useEffect(() => {
        fixRetina(canvasRef.current)
    }, [])

    // fix for Mac Retina display
    // https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio
    function fixRetina(canvas: HTMLCanvasElement | null) {
        if (canvas === null) return

        const scale = window.devicePixelRatio

        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * scale
        canvas.height = rect.height * scale

        const ctx = canvas.getContext("2d")
        ctx?.scale(scale, scale)
    }

    return canvasRef
}

export default useCanvas
