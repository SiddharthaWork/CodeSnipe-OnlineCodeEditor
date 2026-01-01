const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://siddharthashrestha2345_db_user:B6X1HulcHxSVA9Nf@cluster0.igvr0hu.mongodb.net/');

const projectSchema = new mongoose.Schema({
    title: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    userId: String,
    htmlCode: {
        type: String,
        default: "<h1>Namaste World</h1>"
    },
    cssCode: {
        type: String,
        default: "h1{color:blue}"
    },
    jsCode: {
        type: String,
        default: "console.log('Hello World')"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    imageId: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Project", projectSchema);