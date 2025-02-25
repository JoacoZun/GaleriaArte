const { Pool } = require('pg');

const createDatabase = async (DBName) => {
  // Se conecta a la base de datos 'postgres' para crear 'galeria_arte'
  const postgres = new Pool({ database: 'postgres' });
  await postgres.query('DROP DATABASE IF EXISTS galeria_arte');
  await postgres.query('CREATE DATABASE galeria_arte');
  await postgres.end();
  console.log('Base de datos creada!');
};

module.exports = { createDatabase };
