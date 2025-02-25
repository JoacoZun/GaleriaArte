const fs = require('node:fs/promises');

const executeSQL = async (pool, path) => {
  const client = await pool.connect();
  try {
    // Lee archivo SQL
    const sqlFile = await fs.readFile(path, 'utf8');
    // Separa archivo en array de consultas
    const sqlStatements = sqlFile
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    // Ejecuta transaccion SQL
    await client.query('BEGIN');
    for (const statement of sqlStatements) {
      await client.query(statement);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error con archivo SQL:', err);
  } finally {
    client.release();
  }
};

module.exports = { executeSQL };
