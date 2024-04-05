import express from 'express';
import {
    create,
    deleteProductById,
    getAll,
    getProductById,
    related,
    softDeleteProductById,
    updateProductById
} from '../controllers/product';
import checkAuth from '../middlewares/checkAuth';
import checkIsAdmin from '../middlewares/checkAdmin';
import validBodyRequest from '../middlewares/validRequestBody';
import productValidator from '../validations/product';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getProductById);
router.get('/:id/categoryId/related/:productId', related);

router.use(checkAuth, checkIsAdmin);
router.delete('/:id', deleteProductById);
router.put('/hide/:id', softDeleteProductById);

router.use(validBodyRequest(productValidator));
router.post('/', create);
router.patch('/:id', updateProductById);

export default router;