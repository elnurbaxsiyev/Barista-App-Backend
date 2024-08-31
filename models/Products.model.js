const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: [true, 'Category is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    IsStop: {
        type: Boolean,
        default: false
    } 
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = { Products };
