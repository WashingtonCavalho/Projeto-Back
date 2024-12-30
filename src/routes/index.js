const express = require('express');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const productImageRoutes = require('./productImageRoutes');
const productOptionRoutes = require('./productOptionRoutes');
const productCategoryRoutes = require('./productCategoryRoutes'); // Rotas de relacionamento produto-categoria

const router = express.Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/product-images', productImageRoutes);
router.use('/product-options', productOptionRoutes);
router.use('/product-categories', productCategoryRoutes); // Conecta as rotas de relacionamento

module.exports = router;
