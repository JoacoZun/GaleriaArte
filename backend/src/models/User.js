const { pool } = require('../config/db');

exports.create = async ({
  email,
  password,
  nombre,
  apellido,
  telefono = null,
  direccion = null,
}) => {
  const result = await pool.query(
    `INSERT INTO users (
        email, password, nombre, apellido, telefono, direccion
      ) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [email, password, nombre, apellido, telefono, direccion]
  );
  return result.rows[0];
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

exports.getByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return result.rows[0];
};

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

exports.deleteById = async (id) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

exports.updateById = async ({
  id,
  email,
  rol,
  nombre,
  apellido,
  telefono = null,
  direccion = null,
}) => {
  const result = await pool.query(
    `UPDATE users SET
      email = $1, rol = $2, nombre = $3, apellido = $4, telefono = $5, direccion = $6
     WHERE id = $7
     RETURNING *;
    `,
    [email, rol, nombre, apellido, telefono, direccion, id]
  );
  return result.rows[0];
};

exports.updateSelf = async ({
  id,
  nombre,
  apellido,
  telefono,
  direccion,
}) => {
  const result = await pool.query(
    `UPDATE users SET
      nombre = $1, apellido = $2, telefono = $3, direccion = $4
     WHERE id = $5
     RETURNING *;
    `,
    [nombre, apellido, telefono, direccion, id]
  );
  return result.rows[0];
};

