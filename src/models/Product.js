const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Valor padrão
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Valor padrão
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Valor padrão
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'products', // Nome da tabela no banco de dados
    timestamps: false, // Remove as colunas createdAt e updatedAt
});

module.exports = Product;
