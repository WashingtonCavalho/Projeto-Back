const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const ProductOption = require('./ProductOption');
const ProductCategory = require('./ProductCategory'); // Importa o modelo de relacionamento

const initModels = async () => {
  await sequelize.sync({ force: false }); // Sincroniza as tabelas sem apagar os dados
};

module.exports = { sequelize, User, Category, Product, ProductImage, ProductOption, ProductCategory, initModels };
