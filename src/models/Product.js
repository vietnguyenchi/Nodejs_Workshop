import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    hide: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: Array,
    },
    gallery: {
        type: Array,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: Array,
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model('Product', productSchema);