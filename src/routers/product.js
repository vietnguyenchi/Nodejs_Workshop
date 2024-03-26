import express from 'express';
import { create, deleteProductById, getAll, getProductById, updateProductById } from '../controllers/product';

const router = express.Router();

router.get('/products/', getAll);
router.get('/products/:id', getProductById);
router.post('/products/', create);
router.patch('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);

export default router;