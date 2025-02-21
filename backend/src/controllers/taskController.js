const { createTask, getTasksByUser } = require('../models/Task');

const createTaskHandler = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const task = await createTask(title, description, userId);
  res.status(201).json(task);
};

const getTasksHandler = async (req, res) => {
  const userId = req.user.id;
  const tasks = await getTasksByUser(userId);
  res.json(tasks);
};

module.exports = { createTaskHandler, getTasksHandler };