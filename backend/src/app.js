const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { specs } = require('./docs/swaggerConfig');
require('./docs/routes/index.routes');
const artRoutes = require('./routes/artRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'./public')));

// Rutas
app.use('/admin', adminRoutes);
app.use('/api/artworks', artRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
