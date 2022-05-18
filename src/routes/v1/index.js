import express from 'express';
import productRoutes from './productRoutes.js';
const v1Routes = express.Router();
v1Routes.use('/v1', productRoutes);
export default v1Routes;
