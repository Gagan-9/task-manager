const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUserById } = require('../models/User');
const { getAllTasks, deleteTaskById, updateTaskById } = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

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

// Create User
router.post('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword, role);
    res.status(201).json(user);
  });
  
// Update User
router.put('/users/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const { name, email, role } = req.body;
    const user = await updateUserById(req.params.id, { name, email, role });
    res.json(user);
  });
module.exports = router;