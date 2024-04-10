import Order from "../models/Order";

export const createOrder = async (req, res) => {
    try {

        const { userId, items, totalPrice, customerInfo } = req.body;

        const order = await Order.create({ userId, items, totalPrice, customerInfo });

        return res.status(201).json({ message: 'Order created successfully', order })

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

export const getAllOrder = async (req, res) => {
    try {

        const order = await Order.find();

        if (order.length === 0) return res.status(404).json({ message: 'Order not found', error: error.message });


        return res.status(200).json({ message: "Get all order successfully", order })

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

export const getOrderById = async (req, res) => {
    try {

        const { userId, orderId } = req.params;

        const order = await Order.findOne({ userId, _id: orderId });

        if (!order) return res.status(404).json({ message: "Order not found", order });

        return res.status(200).json({ message: "Get order successfully", order })

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

export const updateOrder = async (req, res) => {
    try {

        const { orderId } = req.params;

        const order = await Order.findByIdAndUpdate({ _id: orderId }, req.body, { new: true });

        if (!order) return res.status(404).json({ message: "Update order successfully", order });

        return res.status(200).json({ message: "Get order successfully", order })

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

export const updateOrderStatus = async (req, res) => {
    try {

        const { orderId } = req.params;
        const { status } = req.body;

        const validStatus = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

        if (!validStatus.includes(status)) return res.status(400).json({ message: "Invalid status" });

        const order = await Order.findOne({ _id: orderId });

        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.status === 'delivered' || order.status === 'cancelled') return res.status(400).json({ message: "Order status cannot be updated" });

        order.status = status;

        await order.save();

        return res.status(200).json({ message: "Update order status successfully", order })

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}


