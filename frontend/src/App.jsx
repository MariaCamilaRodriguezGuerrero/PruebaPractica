import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserTaskPage from './pages/UserTaskPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
