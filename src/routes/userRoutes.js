const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

// Rota para obter informações de um usuário pelo ID
router.get('/:id', UserController.getById);

// Rota para criar um novo usuário (Cadastro de usuário)
router.post('/', UserController.create);

// Rota para atualizar um usuário existente
router.put('/:id', UserController.update); // Endpoint de atualização de usuário

// Rota para excluir um usuário
router.delete('/:id', UserController.delete); // Endpoint de deletar usuário

module.exports = router;
