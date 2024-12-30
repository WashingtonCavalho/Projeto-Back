const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { SECRET_KEY } = process.env;

const AuthController = {
    // Endpoint para gerar o token JWT
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' }); // 404 Not Found
            }

            // Verifica se a senha fornecida é correta
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Senha inválida.' }); // 401 Unauthorized
            }

            // Gera o token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET_KEY,
                { expiresIn: '1h' } // O token expira em 1 hora
            );

            res.status(200).json({ token }); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro ao gerar o token.' }); // 500 Internal Server Error
        }
    }
};

module.exports = AuthController;
