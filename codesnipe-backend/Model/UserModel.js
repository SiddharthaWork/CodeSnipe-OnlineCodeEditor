let mongoose = require("mongoose");

mongoose.connect('mongodb+srv://siddharthashrestha2345_db_user:B6X1HulcHxSVA9Nf@cluster0.igvr0hu.mongodb.net/');


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