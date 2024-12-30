const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Importa o modelo de Produto para criar a relação

const ProductImage = sequelize.define('ProductImage', {
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
        onDelete: 'CASCADE', // Exclui as imagens quando o produto correspondente for excluído
        onUpdate: 'CASCADE', // Atualiza automaticamente as imagens ao alterar o ID do produto
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Valor padrão
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'product_images', // Nome da tabela no banco de dados
    timestamps: false, // Remove as colunas createdAt e updatedAt
});

Product.hasMany(ProductImage, {
    foreignKey: 'product_id',
    as: 'images',
});

ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
});

module.exports = ProductImage;
