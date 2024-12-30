const { ProductCategory } = require('../models');

const ProductCategoryController = {
    create: async (req, res) => {
        try {
            const { product_id, category_id } = req.body;

            if (!product_id || !category_id) {
                return res.status(400).json({ error: 'Os campos product_id e category_id são obrigatórios.' });
            }

            const productCategory = await ProductCategory.create({ product_id, category_id });
            res.status(201).json(productCategory); // 201 Created
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    getByProductId: async (req, res) => {
        try {
            const { product_id } = req.params;
            const categories = await ProductCategory.findAll({ where: { product_id } });

            if (!categories.length) {
                return res.status(204).send(); // 204 No Content
            }

            res.status(200).json(categories); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    delete: async (req, res) => {
        try {
            const { product_id, category_id } = req.params;

            const productCategory = await ProductCategory.findOne({ where: { product_id, category_id } });

            if (!productCategory) {
                return res.status(404).json({ error: 'Relacionamento não encontrado.' }); // 404 Not Found
            }

            await productCategory.destroy();
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = ProductCategoryController;
