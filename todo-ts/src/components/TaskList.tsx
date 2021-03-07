import { List } from '@material-ui/core';
import TaskItem from './TaskItem';
import { Task } from '../Types';

type Props = {
  tasks: Task[]
}

// note: need to use string key for TaskItem otherwise will get warning
function TaskList({ tasks }: Props) {
  return (
    <>{
      tasks.length === 0 ?
        '登録されたTODOはありません。' :
        <List>
          {tasks.map(task => (
            <TaskItem key={`${task.id}`} task={task} />
          ))}
        </List>
    }</>
  );
}

export default TaskList
