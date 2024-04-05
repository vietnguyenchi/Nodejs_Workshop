import Category from "../models/Category";
import Product from "../models/Product";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const categoy = await Category.create({
            name: req.body.name,
            slug: slugify(req.body.name, "-"),
        });

        return res.status(200).json({ message: "Create category successfully", categoy: categoy });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
};

export const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (categories.length === 0) return res.status(404).json({ message: "No categories found" });

        return res.status(200).json(categories);

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
};

export const getCategoryById = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        const category = await Category.findById(req.params.id);

        if (category.length === 0) return res.status(404).json({ message: "No category found" });

        return res.status(200).json({ message: "Get category successfully", category, products });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
};

// Hard delete
export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Delete category successfully", category });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
};

// Soft delete
export const softDeleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { isHidden: true }, { new: true });

        return res.status(200).json({ message: "Update category successfully", category });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
}

export const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({ message: "Update category successfully", category });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }
};
