import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import CanvasArrows from './CanvasArrows';
import CanvasHexGrid from './CanvasHexGrid';
import CanvasInteraction from './CanvasInteraction';
import { Hex, Point } from './Types';

// How to use 'theme' and 'props' in makeStyles?
// https://stackoverflow.com/questions/56111294
const useStyles = makeStyles<Theme, Props>((theme) => ({
    canvasWrapper: props => ({
        position: "relative",
        width: props.width,
        height: props.height,
        margin: "0 auto",
    }),
    canvas: props => ({
        position: "absolute",
        top: 0,
        left: 0,
        width: props.width,
        height: props.height,
        border: "1px solid black",
    }),
}))

type Props = {
    width: number
    height: number
    hexSize: number
}

function BFS(props: Props) {
    const classes = useStyles(props)
    const hexOrigin: Point = { x: props.width / 2, y: props.height / 2 }

    const [hexes, setHexes] = useState<Hex[]>([])
    const [comeFrom, setComeFrom] = useState<{ [key: string]: Hex; }>({})

    return (
        <div className={classes.canvasWrapper} >
            <CanvasHexGrid {...props}
                hexOrigin={hexOrigin}
                className={classes.canvas}
                setHexes={setHexes} />
            <CanvasArrows {...props}
                hexOrigin={hexOrigin}
                className={classes.canvas}
                comeFrom={comeFrom} />
            <CanvasInteraction {...props}
                hexOrigin={hexOrigin}
                className={classes.canvas}
                hexes={hexes}
                comeFrom={comeFrom}
                setComeFrom={setComeFrom} />
        </div>
    )
}

export default BFS
