import slugify from "slugify";
import Product from "../models/Product";

export const create = async (req, res) => {
    try {

        const product = await Product.create({ ...req.body, slug: slugify(req.body.name, "-") });

        return res.status(201).json({ message: 'Product created successfully', data: product });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export const getAll = async (req, res) => {
    try {

        const products = await Product.find({});

        if (products.length === 0) return res.status(200).json({ message: 'Empty product', product: products });

        return res.status(200).json({ message: 'Get all products', data: products });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        return res.status(200).json({ message: 'Get product successful', product: product });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export const deleteProductById = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Delete product successful', product: product });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export const updateProductById = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ message: 'Update product successful', product: product });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}