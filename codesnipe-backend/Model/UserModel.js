let mongoose = require("mongoose");

mongoose.connect('mongodb+srv://siddhartha:lnstc000@codesnipe.afdb0lv.mongodb.net/?retryWrites=true&w=majority&appName=Codesnipe');


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