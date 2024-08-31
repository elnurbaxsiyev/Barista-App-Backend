const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    title: {  // 'name' yerine 'title' kullanıldı
        type: String,
        required: [true, 'Title is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true, 
    }
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = { Users };
