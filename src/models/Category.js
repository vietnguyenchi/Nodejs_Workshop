import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Category', categorySchema);
