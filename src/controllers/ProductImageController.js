const { ProductImage } = require('../models');

const ProductImageController = {
    create: async (req, res) => {
        try {
            const { product_id, enabled, path } = req.body;

            if (!product_id || !path) {
                return res.status(400).json({ error: 'Os campos product_id e path são obrigatórios.' });
            }

            const image = await ProductImage.create({ product_id, enabled, path });
            res.status(201).json(image); // 201 Created
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    getAllByProductId: async (req, res) => {
        try {
            const { product_id } = req.params;
            const images = await ProductImage.findAll({ where: { product_id } });

            if (!images.length) {
                return res.status(204).send(); // 204 No Content
            }

            res.status(200).json(images); // 200 OK
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const image = await ProductImage.findByPk(id);

            if (!image) {
                return res.status(404).json({ error: 'Imagem não encontrada.' }); // 404 Not Found
            }

            await image.destroy();
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    },
};

module.exports = ProductImageController;
