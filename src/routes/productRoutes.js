const express = require('express');
const { ProductController } = require('../controllers');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

const router = express.Router();

// Rota para obter todos os produtos
router.get('/', ProductController.getAll);

// Rota para obter um produto pelo ID
router.get('/:id', ProductController.getById);

// Rota para criar um novo produto (exige token)
router.post('/', authMiddleware, ProductController.create);

// Rota para atualizar um produto existente (exige token)
router.put('/:id', authMiddleware, ProductController.update);

// Rota para deletar um produto (exige token)
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;
