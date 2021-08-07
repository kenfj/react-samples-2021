import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import BFS from './bfs/BFS';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <p><strong>BFS visualized</strong>: click to set goal and move mouse to show path</p>
        <BFS width={800} height={600} hexSize={20} />
      </Paper>
    </div>
  );
}

export default App;
