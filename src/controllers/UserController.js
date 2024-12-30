const { User } = require('../models');
const bcrypt = require('bcryptjs'); // Para hash de senha

const UserController = {
    // Função para obter um usuário pelo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            // Busca o usuário pelo ID
            const user = await User.findByPk(id);

            // Verifica se o usuário foi encontrado
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' }); // 404 Not Found
            }

            // Retorna os dados do usuário com status 200
            res.status(200).json(user); // 200 OK
        } catch (error) {
            // Caso ocorra algum erro no servidor
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para criar um novo usuário (Cadastro)
    create: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Validação simples (pode ser expandida conforme necessário)
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Campos obrigatórios ausentes.' }); // 400 Bad Request
            }

            // Verificar se o e-mail já existe no banco de dados
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email já cadastrado.' }); // 400 Bad Request
            }

            // Criptografando a senha com bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria o usuário no banco de dados com a senha criptografada
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            // Retorna o usuário criado com status 201
            res.status(201).json(user); // 201 Created
        } catch (error) {
            // Caso ocorra algum erro no servidor
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para atualizar as informações de um usuário
    update: async (req, res) => {
        try {
            const { id } = req.params; // Obtém o id do usuário a ser atualizado
            const { name, email, password } = req.body; // Obtém os novos dados do corpo da requisição

            // Verifica se o usuário existe
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' }); // 404 Not Found
            }

            // Se a senha for fornecida, criptografa a nova senha
            let hashedPassword = password;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Atualiza o usuário com os novos dados
            await user.update({
                name,
                email,
                password: hashedPassword, // Atualiza a senha, caso fornecida
            });

            // Retorna o usuário atualizado com status 200
            res.status(200).json(user); // 200 OK
        } catch (error) {
            // Caso ocorra algum erro no servidor
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para excluir um usuário
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            // Verifica se o usuário existe
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' }); // 404 Not Found
            }

            // Exclui o usuário
            await user.destroy();

            // Retorna uma resposta sem conteúdo após a exclusão
            res.status(204).send(); // 204 No Content
        } catch (error) {
            // Caso ocorra algum erro no servidor
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = UserController;
