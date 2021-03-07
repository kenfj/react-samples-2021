import { Backdrop, CircularProgress, Grid, makeStyles, Paper, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createContext } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import useTodoApi from './hooks/TodoApi';
import { DeleteTask, Task, UpdateTask } from './Types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 700,
    margin: "0 auto",
    padding: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const AppContext = createContext<[UpdateTask, DeleteTask]>([
  (task: Task) => { }, (id: number) => { }
]);

function App() {
  const classes = useStyles();
  const [{taskState, msgState}, api] = useTodoApi("http://localhost:3000");

  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TaskInput createTask={api.createTask} />
          </Grid>
          <Grid item xs={12}>
            <AppContext.Provider value={[api.updateTask, api.deleteTask]}>
              <TaskList tasks={taskState.tasks} />
            </AppContext.Provider>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop className={classes.backdrop} open={msgState.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={msgState.isShowing} autoHideDuration={3000} onClose={api.hideMsg}>
        <Alert onClose={api.hideMsg} severity={msgState.isError ? "error" : "info"}>
          {msgState.message}
        </Alert>
      </Snackbar>
    </div>
  )
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default App;
