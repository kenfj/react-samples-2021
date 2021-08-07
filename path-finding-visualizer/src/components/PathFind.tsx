import { Button, makeStyles } from '@material-ui/core';
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import Node from './Node';
import Grid, { StartEndPos } from './Grid';
import AStar, { AStarRes } from '../algorithm/AStar';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: "80%",
    margin: "auto",
  },
  rowWrapper: {
    display: "flex",
  },
  node: {
    width: "20px",
    height: "20px",
    border: "1px solid black",
  },
  nodeStart: {
    backgroundColor: "green",
  },
  nodeEnd: {
    backgroundColor: "red",
  },
  nodeWall: {
    backgroundColor: "rgb(12,53,71)",
  },

  nodeVisited: {
    animation: `$visited 1.5s ${theme.transitions.easing.easeInOut} 0s 1 alternate forwards running`
  },
  "@keyframes visited": {
    "0%": {
      transform: "scale(0.3)",
      backgroundColor: "rgba(0,0,66,0.75)",
      borderRadius: "10%",
    },
    "50%": {
      transform: "scale(1.2)",
      backgroundColor: "peachpuff",
    },
    "100%": {
      transform: "scale(1)",
      backgroundColor: "peachpuff",
    },
  },
  nodeShortestPath: {
    animation: `$shortestPath 1.5s ${theme.transitions.easing.easeInOut} 0s 1 alternate forwards running`
  },
  "@keyframes shortestPath": {
    "0%": {
      transform: "scale(0.6)",
      backgroundColor: "aquamarine",
    },
    "50%": {
      transform: "scale(1.2)",
      backgroundColor: "aquamarine",
    },
    "100%": {
      transform: "scale(1)",
      backgroundColor: "aquamarine",
    }
  },
}));

function PathFind() {
  const classes = useStyles();
  const [TheGrid, setTheGrid] = useState<Grid>()

  const initialRefs =
    Array.from({ length: 20 }, _ =>
      Array.from({ length: 30 }, _ =>
        createRef<HTMLDivElement>()
      )
    )
  const refs = useRef<RefObject<HTMLDivElement>[][]>(initialRefs);

  const TIME_CLOCK = 5

  useEffect(() => {
    const initGrid = () => {

      const startEndPos: StartEndPos = {
        startRow: 5,
        startCol: 5,
        endRow: 15,
        endCol: 25,
      }

      const grid = new Grid(20, 30, startEndPos)
      setTheGrid(grid)
    }
    initGrid()
  }, [])

  const visualizeShortestPath = (shortestPath: Node[]) => {
    shortestPath.forEach((node, i) => {
      setTimeout((() => {
        if (!(node.isStart || node.isEnd))
          refs.current[node.i][node.j].current!.classList.add(classes.nodeShortestPath)
      }), TIME_CLOCK * i)
    })
  }

  const visualizePath = (aStar: AStarRes) => {
    aStar.visited.forEach((node, i) => {
      setTimeout(() => {
        if (!(node.isStart || node.isEnd))
          refs.current[node.i][node.j].current!.classList.add(classes.nodeVisited)
      }, TIME_CLOCK * 2 * i);
    })

    setTimeout(() => {
      visualizeShortestPath(aStar.shortestPath)
    }, TIME_CLOCK * 2 * aStar.visited.length)
  }

  const findPath = () => {
    const startNode = TheGrid!.startNode
    const endNode = TheGrid!.endNode

    let aStar = AStar(startNode, endNode)
    visualizePath(aStar)
  }

  return (
    <div className={classes.wrapper}>
      <h1>PathFind Component</h1>
      <p>
        <Button
          color="primary"
          variant="outlined"
          onClick={findPath}>findPath</Button>
      </p>
      {TheGrid?.grid.map((row, i) =>
        <div key={i} className={classes.rowWrapper}>
          {row.map((col, j) =>
            <div
              className={
                `${classes.node} ${col.isStart ?
                  classes.nodeStart : col.isWall ?
                    classes.nodeWall : col.isEnd ?
                      classes.nodeEnd : ""}`}
              ref={refs.current[i][j]}
              key={`node-${i}-${j}`} />
          )}
        </div>
      )}
    </div>
  )
}

export default PathFind
