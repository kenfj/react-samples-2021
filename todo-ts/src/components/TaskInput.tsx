import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
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
  const [title, setTitle] = useState<string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onClick = () => {
    createTask(title);
    setTitle('');
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} className={classes.root}>
        <TextField
          type="text"
          value={title}
          className={classes.textfield}
          onChange={onChange}
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
