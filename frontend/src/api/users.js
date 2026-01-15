const API_URL = 'http://localhost:8000/index.php/api';

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const getUserTasks = async (userId) => {
  const res = await fetch(`${API_URL}/user/${userId}/tasks`);
  return res.json();
};
