import express from "express";
import { addItemToCart, getProductsInCart, removeProductFromCart, updateProdcutQuantity } from "../controllers/cart";

const router = express.Router();

router.post('/cart', addItemToCart);
router.get('/cart/:userId', getProductsInCart);
router.put('/cart/update-product-quantity', updateProdcutQuantity);
router.delete('/cart/remove-product', removeProductFromCart);

export default router;