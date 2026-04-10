import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/edit"
        element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;