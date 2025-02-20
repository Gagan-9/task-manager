const { createTask, getTasksByUser, getAllTasks, updateTask, deleteTask } = require('../models/Task');

const createTaskHandler = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const task = await createTask(title, description, userId);
  res.status(201).json(task);
};

const getTasksHandler = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  let tasks;
  if (role === 'admin') {
    tasks = await getAllTasks();
  } else {
    tasks = await getTasksByUser(userId);
  }

  res.json(tasks);
};

const updateTaskHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = await updateTask(id, title, description);
  res.json(task);
};

const deleteTaskHandler = async (req, res) => {
  const { id } = req.params;
  const task = await deleteTask(id);
  res.json(task);
};

module.exports = { createTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler };