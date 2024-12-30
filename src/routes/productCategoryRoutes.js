const express = require('express');
const { ProductCategoryController } = require('../controllers');

const router = express.Router();

router.post('/', ProductCategoryController.create); // Cria um relacionamento produto-categoria
router.get('/product/:product_id', ProductCategoryController.getByProductId); // Lista categorias de um produto
router.delete('/:product_id/:category_id', ProductCategoryController.delete); // Remove um relacionamento produto-categoria

module.exports = router;
