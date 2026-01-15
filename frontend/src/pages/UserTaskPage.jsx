import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserTasks } from '../api/users';

export default function UserTaskPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getUserTasks(id).then(setTasks);
  }, [id]);

  return (
    <div>
      <h1>tareas del usuario</h1>

      <ul>
        {tasks.map(task => (
          <li key={task.taskId}>
            <strong>{task.taskName}</strong> <br />
            proyecto: {task.projectName} <br />
            valor: ${task.projectValue}
          </li>
        ))}
      </ul>
    </div>
  );
}
