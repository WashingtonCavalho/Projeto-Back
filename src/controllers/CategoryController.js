const { Category } = require('../models');

const CategoryController = {
    // Função para obter todas as categorias
    getAll: async (req, res) => {
        try {
            const categories = await Category.findAll();
            if (!categories || categories.length === 0) {
                return res.status(404).json({ error: 'Nenhuma categoria encontrada.' });
            }
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para obter uma categoria pelo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada.' }); // 404 Not Found
            }

            res.status(200).json(category); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para criar uma nova categoria
    create: async (req, res) => {
        try {
            const { name, slug, use_in_menu } = req.body;

            if (!name || !slug) {
                return res.status(400).json({ error: 'Nome e slug são obrigatórios.' }); // 400 Bad Request
            }

            const category = await Category.create({ name, slug, use_in_menu: use_in_menu || 0 });
            res.status(201).json(category); // 201 Created
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para atualizar uma categoria
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, slug, use_in_menu } = req.body;

            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada.' }); // 404 Not Found
            }

            category.name = name || category.name;
            category.slug = slug || category.slug;
            category.use_in_menu = use_in_menu || category.use_in_menu;

            await category.save();
            res.status(200).json(category); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para deletar uma categoria
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada.' }); // 404 Not Found
            }

            await category.destroy();
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = CategoryController;
