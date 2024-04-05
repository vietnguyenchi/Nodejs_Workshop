import Cart from "../models/Cart";

export const addItemToCart = async (req, res) => {

    const { userId, productId, quantity } = req.body;

    try {

        let cart = await Cart.findOne({ userId });

        if (!cart) cart = new Cart({ userId, products: [] })

        const existProductIndex = cart.products.findIndex(product => product.id.toString() == productId);

        if (existProductIndex !== -1) cart.products[existProductIndex].quantity += quantity;
        else cart.products.push({ productId, quantity });

        await cart.save();

        return res.status(200).json({ message: 'Add product to cart successfully', cart });

    } catch (error) {

        next(error);

    }
}

export const getProductsInCart = async (req, res) => {

    const { userId } = req.params;

    try {

        const cart = await Cart.findOne({ userId }).populate('products.productId');

        const cartData = {
            products: cart.products.map(product => ({
                _id: product.productId._id,
                name: product.productId.name,
                price: product.productId.price,
                quantity: product.quantity,
                "total price": product.productId.price * product.quantity
            }))
        }

        return res.status(200).json({ message: "Get products in cart successfully", products: cartData });

    } catch (error) {

        next(error);

    }
}

export const removeProductFromCart = async (req, res) => {

    const { userId, productId } = req.body;

    try {

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const existProductIndex = cart.products.findIndex(product => product.productId.toString() == productId);

        if (existProductIndex !== -1) {

            cart.products.splice(existProductIndex, 1);

            await cart.save();

            return res.status(200).json({ message: 'Remove product from cart successfully', cart });

        } else {

            return res.status(404).json({ message: 'Product not found in cart' });

        }

    } catch (error) {

        next(error);

    }
}

export const updateProdcutQuantity = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const existProductIndex = cart.products.findIndex(product => product.productId.toString() == productId);

        if (existProductIndex !== -1) {

            cart.products[existProductIndex].quantity = quantity;

            await cart.save();

            return res.status(200).json({ message: 'Update product quantity successfully', cart });

        } else {

            return res.status(404).json({ message: 'Product not found in cart' });

        }

    } catch (error) {

        next(error);

    }
}

export const increaseProductQuantity = async (req, res) => {

    const { userId, productId } = req.body;

    try {

        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const product = cart.products.find((item) => item.productId.toString() === productId);

        if (!product) return res.status(404).json({ message: 'Product not found in cart' });

        product.quantity++;

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        next(error);

    }
}

export const decreaseProductQuantity = async (req, res) => {

    const { userId, productId } = req.body;

    try {

        let cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const product = cart.products.find((item) => item.productId.toString() === productId);

        if (!product) return res.status(404).json({ message: 'Product not found in cart' });

        if (product.quantity > 1) product.quantity--;

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        next(error);

    }
}

