const { ProductOption } = require('../models');

const ProductOptionController = {
    create: async (req, res) => {
        try {
            const { product_id, title, shape, radius, type, values } = req.body;

            if (!product_id || !title || !values) {
                return res.status(400).json({ error: 'Os campos product_id, title e values são obrigatórios.' });
            }

            const option = await ProductOption.create({ product_id, title, shape, radius, type, values });
            res.status(201).json(option); // 201 Created
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    getAllByProductId: async (req, res) => {
        try {
            const { product_id } = req.params;
            const options = await ProductOption.findAll({ where: { product_id } });

            if (!options.length) {
                return res.status(204).send(); // 204 No Content
            }

            res.status(200).json(options); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const option = await ProductOption.findByPk(id);

            if (!option) {
                return res.status(404).json({ error: 'Opção não encontrada.' }); // 404 Not Found
            }

            await option.destroy();
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = ProductOptionController;
