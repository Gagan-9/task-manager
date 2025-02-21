import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  deleteUserById,
  createUser,
  updateUserById,
} from '../api';

const AdminDashboard = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    const users = await getAllUsers(token);
    setUsers(users);
  };

  const handleDeleteUser = async (id) => {
    await deleteUserById(id, token);
    fetchUsers(); // Refresh the list after deletion
  };

  const handleCreateUser = async () => {
    await createUser(newUser, token);
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    fetchUsers(); // Refresh the list after creation
  };

  const handleUpdateUser = async () => {
    await updateUserById(editUser.id, editUser, token);
    setEditUser(null);
    fetchUsers(); // Refresh the list after update
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Create User Form */}
      <div>
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      {/* List of Users */}
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit User Form */}
      {editUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;