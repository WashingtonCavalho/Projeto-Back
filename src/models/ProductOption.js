const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Importa o modelo de Produto para criar a relação

const ProductOption = sequelize.define('ProductOption', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Referência ao modelo Produto
            key: 'id',      // Coluna referenciada
        },
        onDelete: 'CASCADE', // Exclui as opções quando o produto correspondente for excluído
        onUpdate: 'CASCADE', // Atualiza automaticamente as opções ao alterar o ID do produto
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true,
        defaultValue: 'square', // Valor padrão
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // Valor padrão
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text', // Valor padrão
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_options', // Nome da tabela no banco de dados
    timestamps: false, // Remove as colunas createdAt e updatedAt
});

Product.hasMany(ProductOption, {
    foreignKey: 'product_id',
    as: 'options',
});

ProductOption.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
});

module.exports = ProductOption;
