const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET_KEY } = process.env; // A chave secreta do JWT, deve ser colocada no .env

// Middleware para validar o token JWT
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' }); // 401 Unauthorized
    }

    try {
        // Verifica o token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Adiciona o usuário decodificado ao objeto da requisição
        req.user = decoded;

        next(); // Passa para o próximo middleware ou controller
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' }); // 401 Unauthorized
    }
};

module.exports = authMiddleware;
