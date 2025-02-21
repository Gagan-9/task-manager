import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  return (
    <Router>
      <Navbar token={token} setToken={setToken} role={role} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={token ? <TaskList token={token} role={role} /> : <Login setToken={setToken} />} />
        <Route path="/create-task" element={token && role === 'admin' ? <TaskForm token={token} /> : <Login setToken={setToken} />} />
        <Route path="/admin" element={token && role === 'admin' ? <AdminDashboard token={token} /> : <Login setToken={setToken} />} />
        <Route path="/" element={<h1>Welcome to Task Manager</h1>} />
      </Routes>
    </Router>
  );
};

export default App;