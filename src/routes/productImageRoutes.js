const express = require('express');
const { ProductImageController } = require('../controllers');

const router = express.Router();

router.post('/', ProductImageController.create); // Cria uma nova imagem
router.get('/product/:product_id', ProductImageController.getAllByProductId); // Lista imagens de um produto
router.delete('/:id', ProductImageController.delete); // Exclui uma imagem pelo ID

module.exports = router;
