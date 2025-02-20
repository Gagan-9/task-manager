const pool = require('../config/db');

const createTask = async (title, description, userId) => {
  const query = `
    INSERT INTO tasks (title, description, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [title, description, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getTasksByUser = async (userId) => {
  const query = 'SELECT * FROM tasks WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getAllTasks = async () => {
  const query = 'SELECT * FROM tasks';
  const result = await pool.query(query);
  return result.rows;
};

const updateTask = async (id, title, description) => {
  const query = `
    UPDATE tasks
    SET title = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [title, description, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { createTask, getTasksByUser, getAllTasks, updateTask, deleteTask };