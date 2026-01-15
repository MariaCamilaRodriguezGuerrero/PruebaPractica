import { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';
import './UsersPage.css';

// Variable de cache fuera del componente
let usersCache = null;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (usersCache) {
      setUsers(usersCache);
    } else {
      getUsers().then(data => {
        usersCache = data;
        setUsers(data);
      });
    }
  }, []);

  return (
    <div className="users-container">
      <h1 className="users-title">Usuarios</h1>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-card">
            <span className="user-name">{user.name}</span>
            <button
              className="user-btn"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              Ver tareas de proyectos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}