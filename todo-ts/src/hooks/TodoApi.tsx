import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { MsgState, Task, TaskState, TodoApi } from '../Types';
import { TaskReducer } from './Reducer';

const instance = axios.create({
  baseURL: "http://localhost:3000"
});

const initTasks: TaskState = {
  tasks: [],
};

const initMsg: MsgState = {
  isError: false,
  message: "",
  isLoading: false,
  isShowing: false
};

const useTodoApi: TodoApi = (baseURL: string) => {
  instance.defaults.baseURL = baseURL;

  const [taskState, taskDispatch] = useReducer(TaskReducer, initTasks);
  const [msgState, setMsgState] = useState(initMsg);

  useEffect(() => {
    setMsgState({ ...initMsg, isLoading: true });

    instance.get<Task[]>("/todo")
      .then(response => {
        taskDispatch({ type: 'Read', tasks: response.data })
        setMsgState({ ...initMsg, message: "Todo data loaded", isLoading: false, isShowing: true });
      })
      .catch(doCatch);
  }, []);

  const createTask = (title: string) => {
    instance.post<Task>("/todo", { title: title, done: false })
      .then(response => {
        taskDispatch({ type: 'Create', task: response.data })
        setMsgState({ ...initMsg, message: "Created", isShowing: true });
      })
      .catch(doCatch);
  };

  const updateTask = (task: Task) => {
    instance.put<Task>(`/todo/${task.id}`, task)
      .then(response => {
        taskDispatch({ type: 'Update', task: response.data })
        setMsgState({ ...initMsg, message: "Updated", isShowing: true });
      })
      .catch(doCatch);
  };

  const deleteTask = (id: number) => {
    instance.delete<Task>(`/todo/${id}`)
      .then(_ => {
        taskDispatch({ type: 'Delete', id: id })
        setMsgState({ ...initMsg, message: "Deleted", isShowing: true });
      })
      .catch(doCatch);
  };

  const doCatch = (ex: any) => {
    const err = ex.response === undefined
      ? ex.message  // Network Error
      : `${ex.response.status} ${ex.response.statusText}`;
    setMsgState({ ...initMsg, isError: true, message: err, isShowing: true });
  };

  const hideMsg = () => {
    setMsgState(s => ({ ...s, isShowing: false }));
  };

  return [
    { taskState, msgState },
    { createTask, updateTask, deleteTask, hideMsg }
  ];
};

export default useTodoApi;
