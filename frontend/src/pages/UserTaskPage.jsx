import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserTasks, getUsers } from '../api/users';
import './UserTaskPage.css';

export default function UserTaskPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUserTasks(id).then(setTasks);
    getUsers().then(users => {
      const user = users.find(u => String(u.id) === String(id));
      setUserName(user ? user.name : '');
    });
  }, [id]);

    const tasksByProject = tasks.reduce((acc, task) => {
    if (!acc[task.projectName]) acc[task.projectName] = [];
    acc[task.projectName].push(task);
    return acc;
  }, {});

  return (
    <div className="user-tasks-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        Regresar a los usuarios
      </button>
      <h1 className="user-tasks-title">
        Tareas de {userName}
      </h1>
      <table className="user-tasks-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tarea</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tasksByProject).map(([projectName, projectTasks]) =>
            projectTasks.map((task, idx) => (
              <tr key={task.taskId}>
                {idx === 0 && (
                  <td rowSpan={projectTasks.length}>{projectName}</td>
                )}
                <td>{task.taskName}</td>
                {idx === 0 && (
                  <td rowSpan={projectTasks.length}>${task.projectValue}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}