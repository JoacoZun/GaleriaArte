const initDB = require('./src/config/initdb.js')
const app = require('./src/app.js');

const startApp = async () => {
  await initDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
};

startApp();

