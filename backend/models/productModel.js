import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name : { type: String, required: true },
    price : { type: Number, default: 0, required: true },
    category : { type: String, required: true },
    img : { type: String, required: true },
    description : { type: String, required: true },
    count : { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;