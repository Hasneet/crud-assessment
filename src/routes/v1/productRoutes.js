import express from 'express';
import ProductController from '../../controllers/productController.js';
const productRoutes = express.Router();
productRoutes.post('/products/save', new ProductController().save);
productRoutes.patch('/products/update', new ProductController().update);
productRoutes.get('/products/:id', new ProductController().get);
productRoutes.get('/products', new ProductController().list);
export default productRoutes;