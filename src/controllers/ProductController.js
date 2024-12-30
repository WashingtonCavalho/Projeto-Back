const { Product } = require('../models');

const ProductController = {
    // Função para obter todos os produtos
    getAll: async (req, res) => {
        try {
            const products = await Product.findAll();
            if (!products || products.length === 0) {
                return res.status(404).json({ error: 'Nenhum produto encontrado.' });
            }
            res.status(200).json(products); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para obter um produto pelo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado.' }); // 404 Not Found
            }

            res.status(200).json(product); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para criar um novo produto
    create: async (req, res) => {
        try {
            const { name, slug, price, price_with_discount, stock, description, enabled, use_in_menu } = req.body;

            if (!name || !slug || !price || !price_with_discount) {
                return res.status(400).json({ error: 'Nome, slug, preço e preço com desconto são obrigatórios.' }); // 400 Bad Request
            }

            const product = await Product.create({
                name,
                slug,
                price,
                price_with_discount,
                stock: stock || 0,
                description: description || '',
                enabled: enabled || 0,
                use_in_menu: use_in_menu || 0
            });

            res.status(201).json(product); // 201 Created
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para atualizar um produto
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, slug, price, price_with_discount, stock, description, enabled, use_in_menu } = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado.' }); // 404 Not Found
            }

            product.name = name || product.name;
            product.slug = slug || product.slug;
            product.price = price || product.price;
            product.price_with_discount = price_with_discount || product.price_with_discount;
            product.stock = stock || product.stock;
            product.description = description || product.description;
            product.enabled = enabled || product.enabled;
            product.use_in_menu = use_in_menu || product.use_in_menu;

            await product.save();
            res.status(200).json(product); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    // Função para deletar um produto
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado.' }); // 404 Not Found
            }

            await product.destroy();
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = ProductController;
