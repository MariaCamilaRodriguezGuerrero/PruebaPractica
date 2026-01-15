import { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h1>usuarios</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <button onClick={() => navigate(`/users/${user.id}`)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
