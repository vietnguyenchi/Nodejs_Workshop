import express from "express";
import { addItemToCart, decreaseProductQuantity, getProductsInCart, increaseProductQuantity, removeProductFromCart, updateProdcutQuantity } from "../controllers/cart";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router.use(checkAuth);
router.post('/', addItemToCart);
router.get('/:userId', getProductsInCart);
router.put('/update-product-quantity', updateProdcutQuantity);
router.delete('/remove-product', removeProductFromCart);
router.patch('/increase', increaseProductQuantity);
router.patch('/decrease', decreaseProductQuantity);

export default router;