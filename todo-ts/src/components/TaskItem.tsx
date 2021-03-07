import { Checkbox, FormControlLabel, IconButton, ListItem, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext } from 'react';
import { AppContext } from '../App';
import { Task } from '../Types';

type Props = {
  task: Task;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  listItem: {
    borderBottom: "1px solid gray",
    '&:hover $button': {
      display: "block",
    },
  },
  listLabel: {
    width: 'calc(100% - 10px)',
  },
  done: {
    textDecoration: "line-through",
  },
  button: {
    display: "none",
  },
}));

function TaskItem({ task }: Props) {
  const classes = useStyles();
  const [UpdateTask, DeleteTask] = useContext(AppContext);

  return (
    <ListItem className={classes.listItem}>
      <FormControlLabel
        label={task.title}
        className={`${classes.listLabel} ${task.done ? classes.done : ""}`}
        control={
          <Checkbox
            checked={task.done}
            color="primary"
            onChange={() => UpdateTask({...task, done: !task.done})} />
        }
      />
      <IconButton
        aria-label="delete"
        color="secondary"
        size="small"
        className={classes.button}
        onClick={() => DeleteTask(task.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default TaskItem
