const express = require('express');
const { ProductOptionController } = require('../controllers');

const router = express.Router();

router.post('/', ProductOptionController.create); // Cria uma nova opção
router.get('/product/:product_id', ProductOptionController.getAllByProductId); // Lista opções de um produto
router.delete('/:id', ProductOptionController.delete); // Exclui uma opção pelo ID

module.exports = router;
