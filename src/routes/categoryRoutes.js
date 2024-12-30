const express = require('express');
const { CategoryController } = require('../controllers');

const router = express.Router();

// Rota para obter todas as categorias
router.get('/', CategoryController.getAll);

// Rota para obter uma categoria pelo ID
router.get('/:id', CategoryController.getById);

// Rota para criar uma nova categoria
router.post('/', CategoryController.create);

// Rota para atualizar uma categoria existente
router.put('/:id', CategoryController.update);

// Rota para deletar uma categoria
router.delete('/:id', CategoryController.delete);

module.exports = router;
