const API_URL = 'http://localhost:8000/index.php/api';

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const getUserTasks = async (userId) => {
  const res = await fetch(`${API_URL}/user/${userId}/tasks`);
  return res.json();
};

export const updateProjectCost = async (projectId, cost) => {
  const res = await fetch(`${API_URL}/project/${projectId}/cost/${cost}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json'
    }
  });
  return res.json();
};

export const createTask = async ({ projectId, userId, name, description }) => {
  const res = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ projectId, userId, name, description })
  });
  return res.json();
};
