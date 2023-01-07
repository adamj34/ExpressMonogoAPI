import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true, trim: true, unique: true},
    price: {type: Number, required: true, trim: true},
    description: {type: String, required: true, trim: true, default: ''},
    quantity: {type: Number, required: true, trim: true},
    unit: {type: String, required: true, trim: true},
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;