const path = require('node:path');
const { pool } = require('./db');
const { executeSQL } = require('./executeSQL');
const { createDatabase } = require('./createDatabase');

require('dotenv/config');

// En desarrollo crea db, tablas y datos iniciales;
// en producción solo crea tablas y datos iniciales

const initializeDB = async () => {
  try {
    console.log('Inicializando base de datos...');
    const schemaPath = path.resolve(__dirname, '../db/schema.sql');
    const seedPath = path.resolve(__dirname, '../db/seed.sql');
    if (process.env.NODE_ENV === 'development') {
      await createDatabase(process.env.PGTESTDATABASE).then(
        console.log('Base de datos creada')
      );
    }
    await executeSQL(pool, schemaPath);
    await executeSQL(pool, seedPath);
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

module.exports = initializeDB;
