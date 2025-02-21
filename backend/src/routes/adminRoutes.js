const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUserById, updateUserById, createUser } = require('../models/User');
const { getAllTasks, deleteTaskById, updateTaskById } = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const bcrypt = require('bcrypt');

// Admin-only routes
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const user = await deleteUserById(req.params.id);
  res.json(user);
});

router.get('/tasks', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

router.delete('/tasks/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const task = await deleteTaskById(req.params.id);
  res.json(task);
});

router.put('/tasks/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { title, description } = req.body;
  const task = await updateTaskById(req.params.id, title, description);
  res.json(task);
});

// Create User (admin only)
router.post('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await createUser(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle specific errors
    if (error.code === '23505') { // Unique constraint violation (e.g., duplicate email)
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Failed to create user' });
  }
});
// Update User (admin only)
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
});
module.exports = router;