const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products', 
            required: [true, 'Product is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
        },
        notes: {
            type: String,
            default: '',
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount must be a positive number'],
    },
    discount: {
        type: Number,
        default: 0, // İndirim varsayılan olarak 0
        min: [0, 'Discount must be a positive number'], 
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = { Orders };
