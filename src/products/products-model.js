import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    }
});

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
