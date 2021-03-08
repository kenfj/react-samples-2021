import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useRef } from 'react';
import { CreateTask } from '../Types';

type Props = {
  createTask: CreateTask
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  textfield: {
    width: 'calc(100% - 100px)',
    marginRight: 10,
  },
}));

function TaskInput({ createTask }: Props) {
  const classes = useStyles();
  const titleElm = useRef<any>()

  const onClick = () => {
    createTask(titleElm.current.value);
    titleElm.current.value = ""
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} className={classes.root}>
        <TextField
          type="text"
          inputRef={titleElm}
          className={classes.textfield}
        />
        <Button
          color="primary"
          variant="outlined"
          onClick={onClick}>Add</Button>
      </Grid>
    </Grid>
  )
}

export default TaskInput
