let mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/codesnipe');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    isBlocked:{
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastOnline: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("User", userSchema);