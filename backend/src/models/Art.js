const { pool } = require('../config/db');

exports.create = async ({
  nombre,
  autor,
  precio,
  img_url = null,
  descripcion = null,
  categoria = null,
  tecnica = null,
  alto = null,
  ancho = null,
}) => {
  const result = await pool.query(
    `INSERT INTO obras (
        nombre, autor, precio, img_url, descripcion, categoria, tecnica, alto, ancho
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [nombre, autor, precio, img_url, descripcion, categoria, tecnica, alto, ancho]
  );
  return result.rows[0];
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT * FROM obras WHERE id = $1', [id]);
  return result.rows[0];
};

exports.getAll = async () => {
  const result = await pool.query('SELECT * FROM obras');
  return result.rows;
};

exports.getAvailable = async () => {
  const result = await pool.query(`SELECT * FROM obras WHERE estado = 'disponible'`);
  return result.rows;
};

exports.deleteById = async (id) => {
  const result = await pool.query(
    'DELETE FROM obras WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

exports.freeByOrderId = async (orderId) => {
  const result = await pool.query(`
    `)
}

exports.updateById = async ({
  estado = 'disponible',
  nombre,
  autor,
  precio,
  img_url,
  descripcion,
  categoria,
  tecnica,
  alto,
  ancho,
  id,
}) => {
  const result = await pool.query(`
    UPDATE
      obras
    SET
      estado = $1,
      nombre = $2,
      autor = $3,
      precio = $4,
      img_url = $5,
      descripcion = $6,
      categoria = $7,
      tecnica = $8,
      alto = $9,
      ancho = $10,
      updated_at = NOW()
    WHERE
      id = $11 RETURNING *
    `,
    [estado, nombre, autor, precio, img_url, descripcion, categoria, tecnica, alto, ancho, id]
  );
  return result.rows[0];
};
