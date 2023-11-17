const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const app = express();

app.use(express.json()); // Para parsear JSON
app.use('/orders', orderRoutes);

module.exports = app;