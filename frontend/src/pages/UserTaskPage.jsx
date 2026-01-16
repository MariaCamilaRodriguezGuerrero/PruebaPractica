import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserTasks, getUsers, updateProjectCost, createTask } from '../api/users';
import './UserTaskPage.css';

const userTasksCache = {};
let usersCache = null;

export default function UserTaskPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [newCost, setNewCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingTaskProject, setCreatingTaskProject] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
    if (userTasksCache[id]) {
      setTasks(userTasksCache[id]);
    } else {
      getUserTasks(id).then(data => {
        userTasksCache[id] = data;
        setTasks(data);
      });
    }

    if (usersCache) {
      const user = usersCache.find(u => String(u.id) === String(id));
      setUserName(user ? user.name : '');
    } else {
      getUsers().then(users => {
        usersCache = users;
        const user = users.find(u => String(u.id) === String(id));
        setUserName(user ? user.name : '');
      });
    }
  }, [id]);

  const tasksByProject = tasks.reduce((acc, task) => {
    if (!acc[task.projectName]) acc[task.projectName] = [];
    acc[task.projectName].push(task);
    return acc;
  }, {});

  const handleEditClick = (projectId, currentCost) => {
    setEditingProject(projectId);
    setNewCost(currentCost);
  };

  const handleCostChange = (e) => {
    setNewCost(e.target.value);
  };

  const handleCostSubmit = async (projectId) => {
    setLoading(true);
    await updateProjectCost(projectId, newCost);
    // Actualiza el cache y el estado local
    const updatedTasks = tasks.map(task =>
      task.projectId === projectId ? { ...task, projectValue: newCost } : task
    );
    userTasksCache[id] = updatedTasks;
    setTasks(updatedTasks);
    setEditingProject(null);
    setLoading(false);
  };

  const handleCreateTaskClick = (projectId) => {
    setCreatingTaskProject(projectId);
    setNewTaskName('');
    setNewTaskDesc('');
  };

  const handleCreateTaskSubmit = async (projectId) => {
    setLoading(true);
    await createTask({
      projectId,
      userId: id,
      name: newTaskName,
      description: newTaskDesc
    });
    // Opcional: recargar tareas
    const data = await getUserTasks(id);
    userTasksCache[id] = data;
    setTasks(data);
    setCreatingTaskProject(null);
    setLoading(false);
  };

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
            <th>Acciones</th>
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
                  <td rowSpan={projectTasks.length}>
                    {editingProject === task.projectId ? (
                      <input
                        type="number"
                        value={newCost}
                        onChange={handleCostChange}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleCostSubmit(task.projectId);
                        }}
                        disabled={loading}
                        style={{ width: '80px' }}
                      />
                    ) : (
                      <>${task.projectValue}</>
                    )}
                  </td>
                )}
                {idx === 0 && (
                  <td rowSpan={projectTasks.length}>
                    {editingProject === task.projectId ? (
                      <button
                        onClick={() => handleCostSubmit(task.projectId)}
                        disabled={loading}
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(task.projectId, task.projectValue)}
                        disabled={loading}
                      >
                        Editar Costo
                      </button>
                    )}
                    <br />
                    {creatingTaskProject === task.projectId ? (
                      <div style={{ marginTop: 8 }}>
                        <input
                          type="text"
                          placeholder="Nombre de la tarea"
                          value={newTaskName}
                          onChange={e => setNewTaskName(e.target.value)}
                          style={{ marginBottom: 4, width: '90%' }}
                          disabled={loading}
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="Descripción"
                          value={newTaskDesc}
                          onChange={e => setNewTaskDesc(e.target.value)}
                          style={{ marginBottom: 4, width: '90%' }}
                          disabled={loading}
                        />
                        <br />
                        <button
                          onClick={() => handleCreateTaskSubmit(task.projectId)}
                          disabled={loading || !newTaskName}
                        >
                          Crear
                        </button>
                        <button
                          onClick={() => setCreatingTaskProject(null)}
                          style={{ marginLeft: 4 }}
                          disabled={loading}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        style={{ marginTop: 8 }}
                        onClick={() => handleCreateTaskClick(task.projectId)}
                        disabled={loading}
                      >
                        Crear tarea
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}