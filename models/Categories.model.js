const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

const Categories = mongoose.model("Categories", CategoriesSchema);

module.exports = { Categories };
