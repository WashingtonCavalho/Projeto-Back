const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

const app = express();

app.use(express.json()); // Middleware para parsear o JSON no corpo das requisições

// Define as rotas
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/auth', authRoutes); // Adiciona as rotas de autenticação

module.exports = app;
