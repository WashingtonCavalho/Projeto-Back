const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');

const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Referência ao modelo Produto
            key: 'id',      // Coluna referenciada
        },
        onDelete: 'CASCADE', // Exclui o relacionamento quando o produto correspondente for excluído
        onUpdate: 'CASCADE', // Atualiza automaticamente o relacionamento ao alterar o ID do produto
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Referência ao modelo Categoria
            key: 'id',       // Coluna referenciada
        },
        onDelete: 'CASCADE', // Exclui o relacionamento quando a categoria correspondente for excluída
        onUpdate: 'CASCADE', // Atualiza automaticamente o relacionamento ao alterar o ID da categoria
    },
}, {
    tableName: 'product_categories', // Nome da tabela no banco de dados
    timestamps: false, // Remove as colunas createdAt e updatedAt
});

Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'categories',
});

Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: 'category_id',
    otherKey: 'product_id',
    as: 'products',
});

module.exports = ProductCategory;
