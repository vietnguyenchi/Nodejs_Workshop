import slugify from "slugify";
import Product from "../models/Product";

export const create = async (req, res) => {
    try {

        const product = await Product.create({ ...req.body, slug: slugify(req.body.name, "-") });

        if (!product) return res.status(400).json({ message: 'Create product failed' });

        return res.status(201).json({ message: 'Product created successfully', data: product });

    } catch (error) {

        next(error);

    }
}

export const getAll = async (req, res) => {
    try {

        const products = await Product.find({});

        if (products.length === 0) return res.status(200).json({ message: 'Empty product', product: products });

        return res.status(200).json({ message: 'Get all products', data: products });

    } catch (error) {

        next(error);

    }
}

export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        return res.status(200).json({ message: 'Get product successful', product: product });

    } catch (error) {

        next(error);

    }
}

// Hard delete
export const deleteProductById = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Delete product successful', product: product });

    } catch (error) {

        next(error);

    }
}

// Soft delete
export const softDeleteProductById = async (req, res) => {
    try {

        const data = await Product.findByIdAndDelete(`${req.params.id}`, { hide: true }, { new: true });

        if (!data) return res.status(400).json({ message: 'Update product failed' });

        return res.status(200).json({ message: 'Update product successful', data: data });

    } catch (error) {

        next(error);

    }
}

export const updateProductById = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ message: 'Update product successful', product: product });

    } catch (error) {

        next(error);

    }
}

export const related = async (req, res) => {
    try {

        const data = await Product.find({
            category: req.params.categoryID,
            _id: { $ne: req.params.productID }
        });

        return res.status(200).json({ message: 'Get related products successful', data });

    } catch (error) {

        next(error);

    }
}