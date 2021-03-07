import { TaskAction, TaskState } from '../Types';

export const TaskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'Read':
      const tasksR = action.tasks!.sort((a, b) => b.id - a.id);
      return { ...state, tasks: tasksR };

    case 'Create':
      const tasksC = [action.task!, ...state.tasks]
      return { ...state, tasks: tasksC };

    case 'Update':
      const tasksU = state.tasks.map(task =>
        task.id === action.task!.id ? action.task! : task
      );
      return { ...state, tasks: tasksU };

    case 'Delete':
      const tasksD = state.tasks.filter(task => task.id !== action.id)
      return { ...state, tasks: tasksD };

    default:
      return state
  };
};
