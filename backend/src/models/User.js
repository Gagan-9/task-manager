const pool = require('../config/db');

const createUser = async (name, email, password, role) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const result = await pool.query(query);
  return result.rows;
};

const deleteUserById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, getAllUsers, deleteUserById };