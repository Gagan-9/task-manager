const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (name, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, hashedPassword, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error for further handling
  }
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

const updateUserById = async (id, updates) => {
  const { name, email, role } = updates;
  const query = `
    UPDATE users
    SET name = $1, email = $2, role = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [name, email, role, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUserById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, getAllUsers, deleteUserById, updateUserById };