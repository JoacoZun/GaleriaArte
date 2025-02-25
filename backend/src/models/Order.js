const { pool } = require('../config/db');

exports.create = async ({ user_id, precio_total, direccion, obras_id }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO orders (
          user_id, precio_total, direccion
        )
        VALUES ($1, $2, $3) RETURNING *`,
      [user_id, precio_total, direccion]
    );
    const order = result.rows[0];

    // Lee el array con IDs de obras compradas y el order.id recién retornado
    // + Actualiza estado de obra
    // + Crea las filas de intersección en la tabla 'order_obras'
    for (const obra_id of obras_id) {
      const obraVendida = await client.query(
        `
        UPDATE
          obras
        SET
          estado = 'vendida', updated_at = NOW()
        WHERE
          estado = 'disponible'AND id = $1
        `,
        [obra_id]
      );
      const ordersObra = await client.query(
        `
        INSERT INTO
          orders_obra (order_id, obra_id)
        VALUES
          ($1, $2) RETURNING *
        `,
        [order.id, obra_id]
      );
    }
    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.getAll = async () => {
  const result = await pool.query(`SELECT * FROM orders`);
  return result.rows;
};

exports.getById = async (orderId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
    orderId,
  ]);
  return result.rows[0];
};

exports.getAllByUserId = async (userId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE user_id = $1`, [
    userId,
  ]);
  return result.rows;
};

exports.cancelById = async (orderId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `
      UPDATE orders
      SET estado = 'cancelada', updated_at = NOW()
      WHERE id = $1 AND estado = 'pendiente'
      RETURNING *`,
      [orderId]
    );
    const order = result.rows[0];
    if (!order) throw new Error('Error al cancelar la orden');
    await client.query(
      `
      UPDATE obras
      SET estado = 'disponible'
      WHERE id IN (
        SELECT obra_id
        FROM orders_obra
        WHERE order_id = $1
      )`,
      [order.id]
    );
    await client.query('COMMIT');
    return order;
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

exports.updateById = async (orderId, estado) => {
  const result = await pool.query(
    `UPDATE orders SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [estado, orderId]
  );
  return { order: result.rows[0] };
};

exports.checkIfBelongsToUser = async (orderId, userId) => {
  const result = await pool.query(
    `SELECT EXISTS( SELECT 1 FROM orders WHERE id = $1 AND user_id = $2 )`,
    [orderId, userId]
  );
  return result.rows[0].exists;
};
