export type Task = {
  id: number
  title: string
  done: boolean
};

export type CreateTask = (title: string) => void;
export type UpdateTask = (task: Task) => void;
export type DeleteTask = (id: number) => void;

export type TaskState = {
  tasks: Task[]
};

export type TaskAction = {
  type: 'Read' | 'Create' | 'Update' | 'Delete'
  tasks?: Task[]
  title?: string
  task?: Task
  id?: number
};

export type MsgState = {
  isError: boolean
  message: string
  isLoading: boolean
  isShowing: boolean
};

export type TodoApi = (baseURL: string) => [
  {
    taskState: TaskState,
    msgState: MsgState
  },
  {
    createTask: CreateTask,
    updateTask: UpdateTask,
    deleteTask: DeleteTask,
    hideMsg: () => void,
  }
];
